package com.gamebroadcast.forum.base;

import java.util.List;

import com.gamebroadcast.forum.exceptions.ApiRequestException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

public abstract class BaseController<T, DTO> {
    private final BaseService<T, DTO> baseService;

    public BaseController(BaseService<T, DTO> baseService) {
        this.baseService = baseService;
    }

    @GetMapping
    public List<T> getAll() {
        return baseService.getAll();
    }

    @GetMapping(path = "/{id}")
    public T get(@PathVariable("id") Long id) {
        try {
            return baseService.get(id);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public void add(@RequestBody DTO newItem) {
        try {
            baseService.add(newItem);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void update(@PathVariable("id") Long id, @RequestBody DTO newItem) {
        try {
            baseService.update(id, newItem);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        try {
            baseService.delete(id);
        } catch (IllegalStateException e) {
            throw new ApiRequestException(e.getMessage());
        }
    }
}
