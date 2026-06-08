package com.shopflow.lab.partialfailure;

/** 调用方视角：下游 reserve 调用的可见结果。 */
public enum ClientView {
  SUCCESS,
  TIMEOUT,
  CONFLICT
}
