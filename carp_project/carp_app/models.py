from django.db import models


class HeroImage(models.Model):
    image = models.ImageField(upload_to='hero/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Hero Image {self.id}"


class GalleryImage(models.Model):
    image = models.ImageField(upload_to='gallery/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Gallery Image {self.id}"
# ===============================
# CONTACT FORM MESSAGES
# ===============================
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.phone}"


# ===============================
# TESTIMONIALS (OPTIONAL / FUTURE)
# ===============================
class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name