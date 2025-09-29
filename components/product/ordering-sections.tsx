"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Minus,
  ShoppingCart,
  MessageCircle,
  FileText,
  Package,
} from "lucide-react";
import { Product, ProductTypeConfig } from "@/types";
import { RequestQuoteModal, QuoteRequestData } from "./request-quote-modal";

interface OrderingSectionProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  formatPrice: (price: number, currency: string) => string;
}

interface WholesaleOrderingSectionProps extends OrderingSectionProps {
  config: NonNullable<ProductTypeConfig["wholesale"]>;
  onAddToCart: () => void;
  isLoading: boolean;
}

interface RetailOrderingSectionProps extends OrderingSectionProps {
  config: NonNullable<ProductTypeConfig["retail"]>;
  onAddToCart: () => void;
  isLoading: boolean;
}

interface B2BOrderingSectionProps extends OrderingSectionProps {
  config: NonNullable<ProductTypeConfig["b2b"]>;
}

export function WholesaleOrderingSection({
  product,
  config,
  quantity,
  onQuantityChange,
  onAddToCart,
  isLoading,
  formatPrice,
}: WholesaleOrderingSectionProps) {
  const moq = config.moq || product.moq;

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold text-blue-900">Wholesale Pricing</h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold text-blue-900">
              {formatPrice(config.price, product.currency)}
            </span>
            <span className="text-blue-700">per piece</span>
          </div>
          <p className="text-sm text-blue-700">
            MOQ: {moq.toLocaleString()} pieces • Available:{" "}
            {product.availableQuantity.toLocaleString()} pieces
          </p>
        </div>
      </div>

      {/* Tiered Pricing */}
      {config.tieredPricing && config.tieredPricing.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-3">Volume Discounts</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {config.tieredPricing.map((tier, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {tier.minQuantity.toLocaleString()}+ pieces:
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(tier.pricePerUnit, product.currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quantity</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => onQuantityChange(Math.max(quantity - 100, moq))}
              className="px-3 py-2 hover:bg-gray-50"
              disabled={quantity <= moq}
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                onQuantityChange(parseInt(e.target.value) || moq)
              }
              className="w-24 px-3 py-2 text-center border-0 focus:ring-0"
              min={moq}
            />
            <button
              onClick={() => onQuantityChange(quantity + 100)}
              className="px-3 py-2 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm text-gray-600">
            Min order: {moq.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Total price is intentionally not shown on product view.
          Total is calculated and shown in the cart after adding the item. */}

      {/* Add to Cart Button */}
      <Button
        onClick={onAddToCart}
        disabled={isLoading || quantity < moq}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isLoading ? (
          "Adding to Cart..."
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Wholesale Cart
          </>
        )}
      </Button>
    </div>
  );
}

export function RetailOrderingSection({
  product,
  config,
  quantity,
  onQuantityChange,
  onAddToCart,
  isLoading,
  formatPrice,
}: RetailOrderingSectionProps) {
  const maxQty = config.maxQuantity || 100;

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingCart className="h-5 w-5 text-green-600" />
          <h4 className="font-semibold text-green-900">Retail Pricing</h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold text-green-900">
              {formatPrice(config.price, product.currency)}
            </span>
            <span className="text-green-700">per piece</span>
          </div>
          <p className="text-sm text-green-700">
            Individual purchase • Max quantity: {maxQty} pieces
          </p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Quantity</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => onQuantityChange(Math.max(quantity - 1, 1))}
              className="px-3 py-2 hover:bg-gray-50"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                onQuantityChange(
                  Math.min(parseInt(e.target.value) || 1, maxQty)
                )
              }
              className="w-20 px-3 py-2 text-center border-0 focus:ring-0"
              min={1}
              max={maxQty}
            />
            <button
              onClick={() => onQuantityChange(Math.min(quantity + 1, maxQty))}
              className="px-3 py-2 hover:bg-gray-50"
              disabled={quantity >= maxQty}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <span className="text-sm text-gray-600">Max: {maxQty} pieces</span>
        </div>
      </div>

      {/* Total price is intentionally not shown on product view.
          Total is calculated and shown in the cart after adding the item. */}

      {/* Add to Cart Button */}
      <Button
        onClick={onAddToCart}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isLoading ? (
          "Adding to Cart..."
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}

export function B2BOrderingSection({
  product,
  config,
  quantity,
  onQuantityChange,
  formatPrice,
}: B2BOrderingSectionProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="h-5 w-5 text-purple-600" />
          <h4 className="font-semibold text-purple-900">B2B Ordering</h4>
        </div>
        <p className="text-sm text-purple-700">
          {config.rfqOnly
            ? "Request for quotation required for this product"
            : "Custom pricing available for business orders"}
        </p>
      </div>

      {!config.rfqOnly && (
        <>
          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Estimated Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => onQuantityChange(Math.max(quantity - 10, 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    onQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-24 px-3 py-2 text-center border-0 focus:ring-0"
                  min={1}
                />
                <button
                  onClick={() => onQuantityChange(quantity + 10)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">pieces</span>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={() => setIsQuoteModalOpen(true)}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Request Quote
        </Button>
        <Button variant="outline" className="w-full">
          <FileText className="h-4 w-4 mr-2" />
          Download Product Specs
        </Button>
      </div>

      {/* B2B Features */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h5 className="font-medium text-gray-900 mb-2">B2B Benefits</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Custom pricing based on volume</li>
          <li>• Flexible payment terms</li>
          <li>• Dedicated account manager</li>
          <li>• Priority support</li>
        </ul>
      </div>

      {/* Request Quote Modal */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productId={product.id}
        productName={product.title}
      />
    </div>
  );
}
