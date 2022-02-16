package com.gamebroadcast.forum.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public abstract class BaseService<T, DTO> {

    private final JpaRepository<T, Long> baseRepository;

    public abstract T createItem(DTO itemDTO);

    public abstract boolean isValid(DTO itemDTO);

    public abstract void updateItem(T item, DTO itemDTO);

    public BaseService(JpaRepository<T, Long> baseRepository) {
        this.baseRepository = baseRepository;
    }

    public void add(DTO itemDTO) throws IllegalStateException {
        if (!isValid(itemDTO)) {
            throw new IllegalStateException("Item is wrong");
        }
        T item = createItem(itemDTO);
        baseRepository.save(item);
    }

    public List<T> getAll() {
        return baseRepository.findAll();
    }

    public T get(Long id) throws IllegalStateException {
        Optional<T> item = baseRepository.findById(id);
        if (item.isEmpty()) {
            throw new IllegalStateException("Base with id " + id + " does not exist");
        }
        return item.get();
    }

    @Transactional
    public void update(Long id, DTO itemDTO) throws IllegalStateException {
        if (!isValid(itemDTO)) {
            throw new IllegalStateException("Item is wrong");
        }
        T item = baseRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Base with id " + id + " does not exist"));
        updateItem(item, itemDTO);
    }

    public void delete(Long id) throws IllegalStateException {
        if (!baseRepository.existsById(id)) {
            throw new IllegalStateException("Base with id " + id + " does not exist");
        }
        baseRepository.deleteById(id);
    }
}
