package com.arwin.backend.service;

import com.arwin.backend.dto.CreateOrderItemRequest;
import com.arwin.backend.dto.CreateOrderRequest;
import com.arwin.backend.dto.OrderResponse;
import com.arwin.backend.model.CustomerOrder;
import com.arwin.backend.model.OrderItem;
import com.arwin.backend.model.Product;
import com.arwin.backend.repository.CustomerOrderRepository;
import com.arwin.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class OrderService {

    private final CustomerOrderRepository customerOrderRepository;
    private final ProductRepository productRepository;

    public OrderService(
            CustomerOrderRepository customerOrderRepository,
            ProductRepository productRepository
    ) {
        this.customerOrderRepository = customerOrderRepository;
        this.productRepository = productRepository;
    }

    public OrderResponse createOrder(CreateOrderRequest request) {
        BigDecimal subtotal = BigDecimal.ZERO;

        CustomerOrder order = new CustomerOrder();
        order.setCustomerName(request.getCustomerName());
        order.setEmail(request.getEmail());
        order.setAddress(request.getAddress());
        order.setCity(request.getCity());
        order.setPostalCode(request.getPostalCode());
        order.setCreatedAt(LocalDateTime.now());

        for (CreateOrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID: " + itemRequest.getProductId()));

            BigDecimal price = BigDecimal.valueOf(product.getPrice());
            BigDecimal quantity = BigDecimal.valueOf(itemRequest.getQuantity());
            BigDecimal lineTotal = price.multiply(quantity);

            subtotal = subtotal.add(lineTotal);

            OrderItem orderItem = new OrderItem(
                    product.getId(),
                    product.getName(),
                    itemRequest.getQuantity(),
                    price
            );

            order.addItem(orderItem);
        }

        BigDecimal tax = subtotal.multiply(BigDecimal.valueOf(0.13));

        BigDecimal shipping;
        if (subtotal.compareTo(BigDecimal.ZERO) == 0) {
            shipping = BigDecimal.ZERO;
        } else if (subtotal.compareTo(BigDecimal.valueOf(500)) >= 0) {
            shipping = BigDecimal.ZERO;
        } else {
            shipping = BigDecimal.valueOf(25);
        }

        BigDecimal total = subtotal.add(tax).add(shipping);

        order.setSubtotal(subtotal);
        order.setTax(tax);
        order.setShipping(shipping);
        order.setTotal(total);

        CustomerOrder savedOrder = customerOrderRepository.save(order);

        return new OrderResponse(
                savedOrder.getId(),
                savedOrder.getSubtotal(),
                savedOrder.getTax(),
                savedOrder.getShipping(),
                savedOrder.getTotal(),
                savedOrder.getCreatedAt()
        );
    }
}
