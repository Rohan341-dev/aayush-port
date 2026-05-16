from django.db import models

class ProfileSettings(models.Model):
    name = models.CharField(max_length=100, default="Prakash Devkota")
    title = models.CharField(max_length=100, default="Thumbnail Designer")
    hero_kicker = models.CharField(max_length=100, default="Premium Thumbnail Design")
    hero_title_line1 = models.CharField(max_length=100, default="Make Them")
    hero_title_span = models.CharField(max_length=100, default="Stop Scrolling.")
    hero_description = models.TextField(default="I create high-impact YouTube thumbnails with strong hooks, bold composition, and a premium visual system built for serious creators.")
    
    about_title = models.CharField(max_length=200, default="Turn Scrollers Into Viewers.")
    about_text = models.TextField(default="I design high-converting YouTube thumbnails that capture attention, spark curiosity, and drive clicks. Let’s stop losing your audience to the feed and start.")
    
    solve_title = models.CharField(max_length=200, default="What I Can Solve For You")
    solve_text_1 = models.TextField(default="I am a professional thumbnail strategist with over a year of experience. I specialize in boosting your channel's CTR and views by creating high-impact visuals that grab attention instantly.")
    solve_text_2 = models.TextField(default="My designs ensure maximum mobile readability and clarity, helping you deliver the high performance and professional look your channel deserves.")
    
    twitter_url = models.URLField(blank=True, null=True)
    whatsapp_number = models.CharField(max_length=20, blank=True, null=True)
    discord_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return f"Settings for {self.name}"

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

class DesignProject(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/')
    category = models.CharField(max_length=100, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_before_after = models.BooleanField(default=False)
    image_before = models.ImageField(upload_to='projects/before/', blank=True, null=True)
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']

class Review(models.Model):
    client_name = models.CharField(max_length=100)
    channel_link = models.URLField(blank=True)
    review_text = models.TextField()
    avatar = models.ImageField(upload_to='reviews/', blank=True, null=True)
    sub_count = models.CharField(max_length=50, blank=True, help_text="e.g. 1.69M Subscribers")
    is_verified = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.client_name
    
    class Meta:
        ordering = ['order']

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.question

    class Meta:
        ordering = ['order']
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"
