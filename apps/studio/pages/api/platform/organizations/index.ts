import { NextApiRequest, NextApiResponse } from 'next'

import apiWrapper from 'lib/api/apiWrapper'

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      return handleGetAll(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
  // Platform specific endpoint
  const response = [
    {
      id: 1,
      name: process.env.DEFAULT_ORGANIZATION_NAME || 'Default Organization',
      slug: 'default-org-slug',
      billing_email: 'billing@supabase.co',
      billing_metadata: {
        billing_provider: 'stripe',
        subscription_id: 'sub_mock_123',
        billing_provider_customer_id: 'cus_mock_123',
        payment_provider: 'stripe',
        payment_provider_customer_id: 'cus_mock_123',
        // Optional partner billing for testing different scenarios
        // partner_billing: {
        //   partner: 'aws',
        //   clazar_buyer_id: 'buyer_123'
        // }
      },
      plan: {
        id: 'enterprise',
        name: 'Enterprise',
      },
    },
  ]
  return res.status(200).json(response)
}
