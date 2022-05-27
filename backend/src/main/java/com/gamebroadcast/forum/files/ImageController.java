package com.gamebroadcast.forum.files;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/images")
@RequiredArgsConstructor
public class ImageController {

    @PostMapping(
            path = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(value = HttpStatus.CREATED)
    @PreAuthorize("hasRole('EDITOR')")
    public void uploadUserProfileImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            System.out.println("O nie!!!");
        } else {
            System.out.println("Hura!!!");
        }
    }
}
