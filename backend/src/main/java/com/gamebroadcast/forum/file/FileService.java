package com.gamebroadcast.forum.file;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class FileService {
    private final String PATH = "src/main/resources/files";

    public String getUniqueName(String username) {
        String phrase = username + System.currentTimeMillis();
        String name = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(phrase.getBytes());
            byte[] digest = md.digest();
            name = Base64Utils.encodeToString(digest);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return name;
    }

    private void createFolder(String path) {
        File dir = new File(path);
        if (! dir.exists()) {
            dir.mkdir();
        }
    }

    public void writeHtmlContent(String path, String htmlContent) {
        //createFolder(PATH + "/" + path);
        try (BufferedWriter buffer = new BufferedWriter(new FileWriter(/*PATH + "/" + path + "/" + */"content.html"))) {
            buffer.write(htmlContent);
        } catch (IOException e) {
            // TODO add custom exception
            throw new NullPointerException(e.getMessage());
        }
    }

    public void writeImage(boolean user, String path, byte[] image) throws FileNotFoundException {
        createFolder(PATH + "/" + path);
        // If it does not exist create file thumbnail.{image.format} in
        // {PATH}/(user ? "users" : "articles")/{path}
        // Write image.*easiest format to read back to SomeImageClass* to it
        String type = user ? "users" : "articles";
        try(FileOutputStream outputStream = new FileOutputStream(PATH + "/" + type + "/" + path + "/" + "image.png")) {
            outputStream.write(image);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public String readHtmlContent(String path) {
        // Open file {PATH}/{path}/content.html
        // Return its content
        String content = "";
        // TODO change path
        try (BufferedReader buffer = new BufferedReader(new FileReader(/*PATH + "/" + path + "/" + */ "content.html"))) {
            String line;
            while ((line = buffer.readLine()) != null)
                content += line;
        } catch (IOException e) {
            // TODO add custom exception
            throw new NullPointerException();
        }
        return content;
    }

    public byte[] readImage(boolean user, String path) throws IOException {
        // Open file {PATH}/(users lub articles)/{path}/image.*the format*
        // Return its content
        String type = user ? "users" : "articles";
        InputStream inStream = getClass().getResourceAsStream(PATH + "/" + type + "/" + path + "/" + "image.png");
        byte[] image = new byte[inStream.available()];
        inStream.read(image);
        return image;
    }
}
