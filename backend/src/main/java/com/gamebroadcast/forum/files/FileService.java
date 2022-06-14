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
    private final String CONTENT_DRIVE_PATH = "src/main/resources/static/content";
    private final String CONTENT_URL_PATH = "http://localhost:8080/content";

    private final String USER_DRIVE_PATH = "src/main/resources/static/user";
    private final String USER_URL_PATH = "http://localhost:8080/user";

    public String getUniqueName(String username) {
        String phrase = username + System.currentTimeMillis();
        String name = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(phrase.getBytes());
            byte[] digest = md.digest();
            name = Base64Utils.encodeToString(digest).substring(0, 8).replace('/', '-');
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
        createFolder(CONTENT_DRIVE_PATH + "/" + hash);
        try (BufferedWriter buffer = new BufferedWriter(
                new FileWriter(CONTENT_DRIVE_PATH + "/" + hash + "/" + "content.json"))) {
            buffer.write(htmlContent);
        } catch (IOException e) {
            // TODO add custom exception
            throw new NullPointerException(e.getMessage());
        }
    }

    public String changeUrlInJson(String editorData, String url, Long imageNumber) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(editorData);
        ((ObjectNode) root.get("entityMap").get(imageNumber.toString()).get("data")).put("src", url);
        return root.toString();
    }

    public void saveImage(MultipartFile multipartFile, String path, String imageName) throws IOException {
        createFolder(path);

        InputStream initialStream = multipartFile.getInputStream();
        byte[] buffer = new byte[initialStream.available()];
        initialStream.read(buffer);

        path = path + "/" + imageName;
        File file = new File(path);
        try (OutputStream outStream = new FileOutputStream(file)) {
            outStream.write(buffer);
        }
    }

    public String saveNewContent(String content, String username) {
        String hash = getUniqueName(username);
        writeContent(hash, content);
        return hash;
    }

    public void saveNewContentFiles(String hash, String content, MultipartFile[] files) {
        try {
            if (files != null) {
                for (long i = 0L; i < files.length; i++) {
                    String path = CONTENT_DRIVE_PATH + "/" + hash;
                    String imageName = "image" + i + ".jpg";
                    saveImage(files[(int) i], path, imageName);
                    path = CONTENT_URL_PATH + "/" + hash + "/" + imageName;
                    content = changeUrlInJson(content, path, i);
                }
            }
            writeContent(hash, content);
        } catch (JsonProcessingException e) {
            // TODO add custom exception
            throw new RuntimeException(e);
        } catch (IOException e) {
            // TODO add custom exception
            throw new RuntimeException(e);
        }
    }

    public void saveProfilePicture(String hash, MultipartFile profilePicture) {
        try {
            saveImage(profilePicture, USER_DRIVE_PATH + "/" + hash, "profile.jpg");
        } catch (IOException e) {
            // TODO add custom exception
            throw new RuntimeException(e);
        }
    }
}