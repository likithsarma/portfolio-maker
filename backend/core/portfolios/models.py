from django.db import models
from django.utils.text import slugify


class Resume(models.Model):
    name = models.CharField(max_length=255, blank=True)
    resume_file = models.FileField(upload_to="resumes/")
    parsed_data = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name if self.name else "Resume"


class Portfolio(models.Model):
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE)
    template_name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    layout_config = models.JSONField(null=True, blank=True) 

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.resume.name)
            slug = base_slug
            counter = 1
            while Portfolio.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.slug
