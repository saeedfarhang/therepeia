from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Category(models.Model):
    fa_name = models.CharField(max_length=200)
    en_name = models.CharField(max_length=200)
    description = models.TextField()
    # image = models.ImageField(upload_to='%Y/%m')

class Product(models.Model):
    fa_name = models.CharField(max_length=200)
    en_name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category , on_delete=models.PROTECT, null=True)
    image1 = models.ImageField(upload_to='products/%Y/%m', default = 'products/defaultimage.jpg')
    # image2 = models.ImageField(upload_to='%Y/%m')
    # image3 = models.ImageField(upload_to='%Y/%m')
    date_added = models.DateTimeField(auto_now_add=True,auto_now=False)
    is_published = models.BooleanField(default=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT, default=1)

    def get_published(self):
        return self.objects.filter(is_published=True)
