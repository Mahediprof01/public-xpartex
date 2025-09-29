"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Package, Building2 } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Product, ProductType } from "@/types";
import {
  WholesaleOrderingSection,
  RetailOrderingSection,
  B2BOrderingSection,
} from "./ordering-sections";

interface ProductOrderingTabsProps {
  product: Product;
}

export function ProductOrderingTabs({ product }: ProductOrderingTabsProps) {
  const { addToCart, calculateTieredPrice } = useCart();
  const [quantities, setQuantities] = useState<Record<ProductType, number>>({
    wholesale: product.productTypes.wholesale?.moq || product.moq,
    retail: 1,
    b2b: 1,
  });
  const [addingToCart, setAddingToCart] = useState<
    Record<ProductType, boolean>
  >({
    wholesale: false,
    retail: false,
    b2b: false,
  });

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
    })}`;
  };

  const handleQuantityChange = (type: ProductType, newQuantity: number) => {
    const config = product.productTypes[type];
    if (!config?.enabled) return;

    let validQuantity = newQuantity;
    if (type === "wholesale") {
      const wholesaleConfig = config as NonNullable<
        typeof product.productTypes.wholesale
      >;
      if (wholesaleConfig?.moq) {
        validQuantity = Math.max(newQuantity, wholesaleConfig.moq);
      } else {
        validQuantity = Math.max(newQuantity, 1);
      }
    } else if (type === "retail") {
      const retailConfig = config as NonNullable<
        typeof product.productTypes.retail
      >;
      if (retailConfig?.maxQuantity) {
        validQuantity = Math.min(
          Math.max(newQuantity, 1),
          retailConfig.maxQuantity
        );
      } else {
        validQuantity = Math.max(newQuantity, 1);
      }
    } else {
      validQuantity = Math.max(newQuantity, 1);
    }

    setQuantities((prev) => ({ ...prev, [type]: validQuantity }));
  };

  const handleAddToCart = async (type: ProductType) => {
    const config = product.productTypes[type];
    if (!config?.enabled) return;

    setAddingToCart((prev) => ({ ...prev, [type]: true }));

    try {
      const quantity = quantities[type];

      // Determine price: wholesale and retail configs include `price`, b2b may not
      let resolvedPrice = product.price;
      if (type === "wholesale") {
        const wholesaleConfig = config as NonNullable<
          typeof product.productTypes.wholesale
        >;
        resolvedPrice = wholesaleConfig?.price ?? product.price;
      } else if (type === "retail") {
        const retailConfig = config as NonNullable<
          typeof product.productTypes.retail
        >;
        resolvedPrice = retailConfig?.price ?? product.price;
      }

      let moqForCart = 1;
      if (type === "wholesale") {
        const wholesaleConfig = config as NonNullable<
          typeof product.productTypes.wholesale
        >;
        moqForCart = wholesaleConfig?.moq ?? product.moq;
      }

      const productForCart = {
        ...product,
        price: resolvedPrice,
        moq: type === "wholesale" ? moqForCart : 1,
        orderType: type,
      };

      await addToCart(productForCart, quantity, "main");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [type]: false }));
    }
  };

  const getEnabledTypes = () => {
    return Object.entries(product.productTypes)
      .filter(([_, config]) => config.enabled)
      .map(([type, _]) => type as ProductType);
  };

  const enabledTypes = getEnabledTypes();
  const defaultTab = enabledTypes.includes(product.primaryType)
    ? product.primaryType
    : enabledTypes[0];

  if (enabledTypes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>No ordering options available for this product</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Order Options
        </h3>
        <p className="text-sm text-gray-600">
          Choose your preferred ordering method
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="wholesale"
            disabled={!product.productTypes.wholesale?.enabled}
            className="flex items-center gap-2"
          >
            <Package className="h-4 w-4" />
            Wholesale
          </TabsTrigger>
          <TabsTrigger
            value="retail"
            disabled={!product.productTypes.retail?.enabled}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Retail
          </TabsTrigger>
          <TabsTrigger
            value="b2b"
            disabled={!product.productTypes.b2b?.enabled}
            className="flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />
            B2B
          </TabsTrigger>
        </TabsList>

        {/* Wholesale Tab */}
        <TabsContent value="wholesale" className="space-y-4">
          {product.productTypes.wholesale?.enabled ? (
            <WholesaleOrderingSection
              product={product}
              config={product.productTypes.wholesale}
              quantity={quantities.wholesale}
              onQuantityChange={(qty) => handleQuantityChange("wholesale", qty)}
              onAddToCart={() => handleAddToCart("wholesale")}
              isLoading={addingToCart.wholesale}
              formatPrice={formatPrice}
            />
          ) : (
            <DisabledSection type="wholesale" />
          )}
        </TabsContent>

        {/* Retail Tab */}
        <TabsContent value="retail" className="space-y-4">
          {product.productTypes.retail?.enabled ? (
            <RetailOrderingSection
              product={product}
              config={product.productTypes.retail}
              quantity={quantities.retail}
              onQuantityChange={(qty) => handleQuantityChange("retail", qty)}
              onAddToCart={() => handleAddToCart("retail")}
              isLoading={addingToCart.retail}
              formatPrice={formatPrice}
            />
          ) : (
            <DisabledSection type="retail" />
          )}
        </TabsContent>

        {/* B2B Tab */}
        <TabsContent value="b2b" className="space-y-4">
          {product.productTypes.b2b?.enabled ? (
            <B2BOrderingSection
              product={product}
              config={product.productTypes.b2b}
              quantity={quantities.b2b}
              onQuantityChange={(qty) => handleQuantityChange("b2b", qty)}
              formatPrice={formatPrice}
            />
          ) : (
            <DisabledSection type="b2b" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DisabledSection({ type }: { type: ProductType }) {
  const typeLabels = {
    wholesale: "Wholesale",
    retail: "Retail",
    b2b: "B2B",
  };

  return (
    <div className="text-center py-8 bg-gray-50 rounded-lg">
      <div className="text-gray-400 mb-2">
        {type === "wholesale" && <Package className="h-8 w-8 mx-auto" />}
        {type === "retail" && <ShoppingCart className="h-8 w-8 mx-auto" />}
        {type === "b2b" && <Building2 className="h-8 w-8 mx-auto" />}
      </div>
      <p className="text-gray-500 font-medium">
        {typeLabels[type]} ordering not available
      </p>
      <p className="text-sm text-gray-400">
        This product is not configured for {type.toLowerCase()} orders
      </p>
    </div>
  );
}
