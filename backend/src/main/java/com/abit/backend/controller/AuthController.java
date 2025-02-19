package com.abit.backend.controller;

import com.abit.backend.db.entity.User;
import com.abit.backend.db.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test/login")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserService userService;

    @PostMapping
    public boolean login(@RequestBody User user) {
        var containUser = userService.getUserByEmail(user.getEmail());
        if (containUser != null
            && containUser
                    .getPassword().equals(user.getPassword())) {
            return true;
        }
        return false;
    }
}