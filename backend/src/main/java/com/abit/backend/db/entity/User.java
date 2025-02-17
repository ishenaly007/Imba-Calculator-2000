package com.abit.backend.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Column(unique = true, nullable = false)
    String email;
    String password;

    @Column(unique = true, nullable = false)
    String username;

    LocalDateTime birthDate;
    String lovePersonName;
    String hatePersonName;

    public User(String email, String password, String username, LocalDateTime birthDate, String lovePersonName, String hatePersonName) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.birthDate = birthDate;
        this.lovePersonName = lovePersonName;
        this.hatePersonName = hatePersonName;
    }

    public User() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(username, user.username) && Objects.equals(birthDate, user.birthDate) && Objects.equals(lovePersonName, user.lovePersonName) && Objects.equals(hatePersonName, user.hatePersonName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), email, password, username, birthDate, lovePersonName, hatePersonName);
    }

    @Override
    public String toString() {
        return "User{" +
               "email='" + email + '\'' +
               ", password='" + password + '\'' +
               ", firstName='" + username + '\'' +
               ", birthDate=" + birthDate +
               ", lovePerson='" + lovePersonName + '\'' +
               ", hatePerson='" + hatePersonName + '\'' +
               ", id=" + id +
               '}';
    }
}
