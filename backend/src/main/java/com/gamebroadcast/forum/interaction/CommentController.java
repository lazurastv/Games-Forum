package com.gamebroadcast.forum.interaction;

import com.gamebroadcast.forum.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/comment")
public class CommentController extends BaseController<Comment, CommentDTO> {
    @Autowired
    public CommentController(CommentService commentService) {
        super(commentService);
    }
}
