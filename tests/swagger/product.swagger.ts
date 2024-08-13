/* eslint-disable prettier/prettier */
import { ApiResponseOptions } from '@nestjs/swagger';
import { CreateProductDto} from '../../src/product/dto/product.dto';
import { HttpStatus } from '@nestjs/common';

// Unauthorized response
export const unauthorized_response: ApiResponseOptions = {
  status: 401,
  description: 'Unauthorized',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 401 },
      message: { type: 'string', example: 'Unauthorized' },
    },
  },
};

// Forbidden response (for role-based access)
export const forbidden_role_response: ApiResponseOptions = {
  status: 403,
  description: 'Forbidden: User does not have the required role',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 403 },
      message: { type: 'string', example: 'Forbidden resource, you have to be owner or admin Role to access this resource' },
      error: { type: 'string', example: 'Forbidden' },
    },
  },
};

// Create Product
export const create_product_response: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Successfully created product',
  type: CreateProductDto,
};

export const create_product_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when creating product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when creating product' },
    },
  },
};

// Get All Products
export const get_all_products_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved all products',
  type: CreateProductDto,
  isArray: true,
};

export const get_all_products_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching all products',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching all products' },
    },
  },
};

// Get Product by ID
export const get_product_by_id_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved product by id',
  type: CreateProductDto,
};

export const get_product_by_id_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching product by id',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching product by id' },
    },
  },
};

// Update Product
export const update_product_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully updated product',
  type: CreateProductDto
};

export const update_product_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when updating product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when updating product' },
    },
  },
};

// Delete Product
export const delete_product_response: ApiResponseOptions = {
  status: HttpStatus.NO_CONTENT,
  description: 'Successfully deleted product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 204 },
      message: { type: 'string', example: 'Product successfully deleted' },
    },
  },
};

export const delete_product_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when deleting product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when deleting product' },
    },
  },
};

// Add Tax to Product
export const add_tax_to_product_response: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Successfully added tax to product',
};

export const add_tax_to_product_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when adding tax to product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when adding tax to product' },
    },
  },
};

// Remove Tax from Product
export const remove_tax_from_product_response: ApiResponseOptions = {
  status: HttpStatus.NO_CONTENT,
  description: 'Successfully removed tax from product',
};

export const remove_tax_from_product_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when removing tax from product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when removing tax from product' },
    },
  },
};

// Add Promo to Product
export const add_promo_to_product_response: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Successfully added promo to product',
};

export const add_promo_to_product_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when adding promo to product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when adding promo to product' },
    },
  },
};

// Remove Promo from Product
export const remove_promo_from_product_response: ApiResponseOptions = {
  status: HttpStatus.NO_CONTENT,
  description: 'Successfully removed promo from product',
};

export const remove_promo_from_product_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when removing promo from product',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when removing promo from product' },
    },
  },
};

// Get Product with Taxes and Promos
export const get_product_with_taxes_promos_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved product with taxes and promotions',
  type: CreateProductDto, // Adjust this based on the actual structure if it includes taxes and promos
};

export const get_product_with_taxes_promos_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching product with taxes and promos',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching product with taxes and promos' },
    },
  },
};
