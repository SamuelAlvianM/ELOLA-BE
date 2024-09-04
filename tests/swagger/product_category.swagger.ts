import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { CreateProductCategoryDto } from '../../src/product_category/dto/productCategory.dto';

// Unauthorized role response
export const unauthorized_role_response: ApiResponseOptions = {
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

// GET all product categories response
export const get_all_product_categories_response: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Successfully retrieved all product categories',
  type: [CreateProductCategoryDto]
};

// GET all product categories bad request response
export const get_all_product_categories_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when fetching all product categories',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when fetching all product categories' },
    },
  },
};

// POST create a new product category response
export const create_product_category_response: ApiResponseOptions = {
  status: 201,
  description: 'Successfully created product category',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Data Category Product Created Success!' },
      data: { $ref: '#/components/schemas/CreateProductCategoryDto' },
    },
  },
};

// POST create a new product category bad request response
export const create_product_category_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when creating product category',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when creating product category' },
    },
  },
};

// GET a single product category by ID response
export const get_product_category_by_id_response: ApiResponseOptions = {
  status: 200,
  description: 'Successfully fetched product category by id',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 200 },
      message: { type: 'string', example: 'Success get Product Category Product by id' },
      data: { $ref: '#/components/schemas/ProductCategory' },
    },
  },
};

export const create_product_category_id_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when get product category by id',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when get product category by id' },
      },
    },
  };

// PATCH update a product category response
export const update_product_category_response: ApiResponseOptions = {
  status: 201,
  description: 'Successfully updated product category',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 201 },
      message: { type: 'string', example: 'Update Data Category Product Success!' },
      data: { $ref: '#/components/schemas/ProductCategory' },
    },
  },
};

export const update_pc_bad_request_response: ApiResponseOptions = {
    status: 400,
    description: 'Error when update product category ',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Error when update product category' },
      },
    },
  };

// DELETE a product category response
export const delete_product_category_response: ApiResponseOptions = {
  status: 204,
  description: 'Successfully deleted product category',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 204 },
      message: { type: 'string', example: 'Data Category Product Successfully Deleted!' },
    },
  },
};

// DELETE a product category bad request response
export const delete_product_category_bad_request_response: ApiResponseOptions = {
  status: 400,
  description: 'Error when deleting product category',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 400 },
      message: { type: 'string', example: 'Bad Request' },
      error: { type: 'string', example: 'Error when deleting product category' },
    },
  },
};
