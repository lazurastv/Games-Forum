package com.gamebroadcast.forum.files;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
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
    public void writeHtmlContent(String hash, String htmlContent) {
        createFolder(PATH + "\\" + hash);
        try (BufferedWriter buffer = new BufferedWriter(new FileWriter(PATH + "\\" + hash + "\\" + "content.html"))) {
            buffer.write(htmlContent);
        } catch (IOException e) {
            // TODO add custom exception
            throw new NullPointerException(e.getMessage());
        }
    }

//    public void writeImage(boolean user, String path, MultipartFile file) throws IOException {
//        if (file.isEmpty()) {
//            throw new IllegalStateException("provisional exception 1");
//        }
//
//        if (!isPathExists(path)) {
//            throw new IllegalStateException("provisional exception 3");
//        }
//
//        String type = user ? "users" : "articles";
//        file.transferTo(new File(PATH + "/" + type + "/" + path + "/" + "image.png"));
//    }

//    public String readHtmlContent(String path) {
//        // Open file {PATH}/{path}/content.html
//        // Return its content
//        String content = "";
//        // TODO change path
//        try (BufferedReader buffer = new BufferedReader(new FileReader(PATH + "/" + path + "/" + "content.html"))) {
//            String line;
//            while ((line = buffer.readLine()) != null)
//                content += line;
//        } catch (IOException e) {
//            // TODO add custom exception
//            throw new NullPointerException();
//        }
//        return content;
//    }

//    public byte[] readImage(boolean user, String path) throws IOException {
//
//        String type = user ? "users" : "articles";
//        InputStream inStream = getClass().getResourceAsStream(PATH + "/" + type + "/" + path + "/" + "image.png");
//        byte[] image = new byte[inStream.available()];
//        inStream.read(image);
//        return image;
//    }

    public String parseJson(String editorData) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(editorData);
        String pictureUrl = root.get("entityMap").get("0").get("data").get("src").textValue();
        return pictureUrl;
    }

    public BufferedImage downloadImageFromUrl(String urlString) {
        try {
            URL url = new URL(urlString);
            BufferedImage image = ImageIO.read(url);
            return image;
        } catch (IOException e) {
            // TODO add custom exception
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    public void saveImage(String path, BufferedImage image) {
        try {
            File out = new File(path);
            ImageIO.write(image, "png", out);
        } catch (IOException e) {
            // TODO add custom exception
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    public String saveNewContent(String content, String username) {
        String hash = getUniqueName(username);
        writeHtmlContent(hash, content);
        try {
            String url = parseJson(content);
            BufferedImage image = downloadImageFromUrl(url);
            saveImage(PATH + "\\" + hash + "\\" + "image.png", image);
            System.out.println("udało się");
        } catch (JsonProcessingException e) {
            System.out.println("Nie udało się");
        }

        return hash;
    }
    public static void main(String[] args) {
        FileService fileService = new FileService();
        fileService.saveNewContent("Ala ma kota", "Franio");
    }
}