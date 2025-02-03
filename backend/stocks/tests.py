from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

class StockAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_stock_data(self):
        response = self.client.get('/api/stock/?ticker=AAPL')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('ticker', response.data)
        self.assertIn('open_price', response.data)