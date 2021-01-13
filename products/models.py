from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Category(models.Model):
    fa_name = models.CharField(max_length=200)
    en_name = models.CharField(max_length=200)
    image1 = models.ImageField(upload_to='categories/%Y/%m', default = 'categories/defaultimage.jpg')
    description = models.TextField()
    # image = models.ImageField(upload_to='%Y/%m')

    def __str__(self):
        return self.fa_name


class Product(models.Model):
    fa_name = models.CharField(max_length=200)
    en_name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    technical_info = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category , on_delete=models.PROTECT, null=True)
    image1 = models.ImageField(upload_to='products/%Y/%m', default = 'products/defaultimage.jpg')
    image2 = models.ImageField(upload_to='products/%Y/%m', null=True, blank=True)
    image3 = models.ImageField(upload_to='products/%Y/%m', null=True, blank=True)
    image4 = models.ImageField(upload_to='products/%Y/%m', null=True, blank=True)
    image5 = models.ImageField(upload_to='products/%Y/%m', null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True,auto_now=False)
    is_published = models.BooleanField(default=True)
    creator = models.ForeignKey(User, on_delete=models.PROTECT, default=1)

    def get_published(self):
        return self.objects.filter(is_published=True)

    def __str__(self):
        return self.fa_name
