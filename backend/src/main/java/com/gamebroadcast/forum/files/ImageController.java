package com.gamebroadcast.forum.files;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/images")
@RequiredArgsConstructor
public class ImageController {

    private final FileService fileService;

    @PostMapping(
            path = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("hasRole('EDITOR')")
    public void uploadUserProfileImage(@RequestParam("file") MultipartFile file) {
        String url = fileService.saveNewImage(file, SecurityContextHolder.getContext().getAuthentication().getName());
        ResponseEntity.status(HttpStatus.CREATED).body("url");
    }
}
