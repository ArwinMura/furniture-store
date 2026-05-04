package com.arwin.backend.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public class CreateOrderRequest {

    @NotBlank(message = "Name is required")
    private String customerName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Postal code is required")
    private String postalCode;

    @NotEmpty(message = "Cart cannot be empty")
    private List<CreateOrderItemRequest> items;

    public CreateOrderRequest() {
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getEmail() {
        return email;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public List<CreateOrderItemRequest> getItems() {
        return items;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public void setItems(List<CreateOrderItemRequest> items) {
        this.items = items;
    }
}
