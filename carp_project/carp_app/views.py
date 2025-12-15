from django.shortcuts import render, redirect
from django.contrib import messages
from .models import HeroImage, GalleryImage, ContactMessage, Testimonial


def home(request):
    # ---------- CONTACT FORM ----------
    if request.method == "POST":
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        message_text = request.POST.get("message")

        if name and phone and message_text:
            ContactMessage.objects.create(
                name=name,
                phone=phone,
                message=message_text
            )
            messages.success(request, "Thank you! We will contact you shortly.")
            return redirect("home")

        messages.error(request, "Please fill all fields correctly.")

    # ---------- DATA FETCH ----------
    hero_images = HeroImage.objects.all()[:4]
    showcase_images = GalleryImage.objects.all()[:4]
    testimonials = Testimonial.objects.all()[:3]

    return render(request, "home.html", {
        "hero_images": hero_images,
        "showcase_images": showcase_images,
        "testimonials": testimonials,
    })
def gallery(request):
    showcase_images = GalleryImage.objects.all().order_by('-created_at')

    context = {
        'showcase_images': showcase_images,
    }
    return render(request, 'gallery.html', context)