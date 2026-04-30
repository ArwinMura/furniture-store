package com.arwin.backend.dto;

import java.util.List;

public class CreateOrderRequest {

    private String customerName;
    private String email;
    private String address;
    private String city;
    private String postalCode;
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
