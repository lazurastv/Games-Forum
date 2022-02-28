```
public class FileService {
    private final String PATH = "src/main/resources/files";

    public String getUniqueName() {
        // name = base64(hash(currentTime()))[0:16] lub inny unikalny sposób uzyskania
        // nazwy
        // redo while folder {name} exists in {PATH}
        return "";
    }

    private void createFolder(String path) {
        // If it does not exist create folder {PATH}/{path}
    }

    public void writeHtmlContent(String path, String htmlContent) {
        createFolder(path);
        // If it does not exist create file content.html in {PATH}/articles/{path}
        // Write htmlContent to content.html
    }

    public void writeImage(boolean user, String path /* , SomeImageClass image */) {
        createFolder(path);
        // If it does not exist create file thumbnail.{image.format} in
        // {PATH}/(user ? "users" : "articles")/{path}
        // Write image.*easiest format to read back to SomeImageClass* to it
    }

    public String readHtmlContent(String path) {
        // Open file {PATH}/{path}/content.html
        // Return its content
        return "";
    }

    public void /* SomeImageClass */ readImage(boolean user, String path) {
        // Open file {PATH}/(users lub articles)/{path}/image.*the format*
        // Return its content
        return;
    }
}
```