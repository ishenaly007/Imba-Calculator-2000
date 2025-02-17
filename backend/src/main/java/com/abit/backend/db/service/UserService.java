package com.abit.backend.db.service;

import com.abit.backend.db.entity.User;
import com.abit.backend.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        log.info("User by id: " + userRepository.findById(id).orElse(null));
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        log.info("User by email: " + userRepository.findByEmail(email).orElse(null));
        return userRepository.findByEmail(email).orElse(null);
    }

    public User getUserByUsername(String username) {
        log.info("User by username: " + userRepository.findByUsername(username).orElse(null));
        return userRepository.findByUsername(username).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public boolean deleteUser(User user) {
        try {
            userRepository.delete(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}