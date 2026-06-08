package com.shopflow.lab.reservation.web;

import com.shopflow.lab.reservation.api.ErrorResponse;
import com.shopflow.lab.reservation.service.ReservationService.InsufficientStockException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ReservationExceptionHandler {

  @ExceptionHandler(InsufficientStockException.class)
  public ResponseEntity<ErrorResponse> handleInsufficient(InsufficientStockException ex) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse(ex.code(), ex.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
        .body(new ErrorResponse("SF-COMMON-422", "参数校验失败"));
  }
}
