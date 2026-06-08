package com.shopflow.arch;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.lang.ArchRule;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

/** ArchUnit 边界：inventory 不得依赖 order 的 domain 包。 */
class ModularMonolithArchitectureTest {

  private static final JavaClasses CLASSES = new ClassFileImporter()
      .importPackages("com.shopflow.order", "com.shopflow.inventory", "com.shopflow.payment");

  @Test
  void inventoryMustNotDependOnOrderDomain() {
    ArchRule rule = noClasses()
        .that().resideInAPackage("com.shopflow.inventory..")
        .should().dependOnClassesThat().resideInAPackage("com.shopflow.order.domain..");
    rule.check(CLASSES);
  }

  @Test
  void paymentMustNotDependOnOrderDomain() {
    ArchRule rule = noClasses()
        .that().resideInAPackage("com.shopflow.payment..")
        .should().dependOnClassesThat().resideInAPackage("com.shopflow.order.domain..");
    rule.check(CLASSES);
  }
}
