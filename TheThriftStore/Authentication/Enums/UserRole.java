package com.TheThriftStore.TheThriftStore.Authentication.Enums;


public enum UserRole {
    customer("customer"),
    admin("admin");
    private String name;
    UserRole(String name) {
        this.name = name;
    }
}