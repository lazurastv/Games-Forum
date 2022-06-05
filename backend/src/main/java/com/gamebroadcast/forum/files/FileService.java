package com.gamebroadcast.forum.files;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class FileService {
    //@Value("${fileservice.path}")
    private final String PATH = "src\\main\\resources\\content";

    public String getUniqueName(String username) {
        String phrase = username + System.currentTimeMillis();
        String name = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(phrase.getBytes());
            byte[] digest = md.digest();
            name = Base64Utils.encodeToString(digest).substring(0,8);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return name;
    }

    private boolean isPathExists(String path) {
        File dir = new File(path);
        return dir.exists();
    }

    private void createFolder(String path) {
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
            System.out.println(path);
        }

    }
    public void writeContent(String hash, String htmlContent) {
        createFolder(PATH + "\\" + hash);
        try (BufferedWriter buffer = new BufferedWriter(new FileWriter(PATH + "\\" + hash + "\\" + "content.json"))) {
            buffer.write(htmlContent);
        } catch (IOException e) {
            // TODO add custom exception
            throw new NullPointerException(e.getMessage());
        }
    }

    public String changeUrlInJson(String editorData, String url, Long imageNumber) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(editorData);
        ((ObjectNode)root.get("entityMap").get(imageNumber.toString()).get("data")).put("src", url);
        return root.toString();
    }

    public String saveImage(MultipartFile multipartFile, String hash, String imageName) throws IOException {
        String path = PATH + "\\" + hash;
        createFolder(path);

        // TODO try with transferTo on nginx
        InputStream initialStream = multipartFile.getInputStream();
        byte[] buffer = new byte[initialStream.available()];
        initialStream.read(buffer);

        path = path + "\\" + imageName;
        File file = new File(path);
        try (OutputStream outStream = new FileOutputStream(file)) {
            outStream.write(buffer);
        }

        return path;
    }

    public String saveNewContent(String content, String username) {
        String hash = getUniqueName(username);
        writeContent(hash, content);
        return hash;
    }

    public void saveNewContentFiles(String hash, String content, MultipartFile[] files, String username) {
        try {
            for (long i = 0L; i < files.length; i++) {
                String path = saveImage(files[(int)i], hash, "image" + i + ".png");
                content = changeUrlInJson(content, path, i);
            }
            writeContent(hash, content);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static void main(String[] args) throws JsonProcessingException {
        String json = "{\"a\": \"aaa\", \"b\": \"bbb\", \"entityMap\": { \"0\": {\"data\": {\"src\": \"Ala ma kota\"}}} }";
        FileService fileService = new FileService();
        json = fileService.changeUrlInJson(json, "Ola ma psa", 0L);
        System.out.println(json);
    }
}