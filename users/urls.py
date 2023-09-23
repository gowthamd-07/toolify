from django.urls import path
from users import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('edit_profile/', views.edit_profile, name='edit_profile'),
    path('yt-video-downloader/', views.yt_video_downloader, name='yt-video-downloader'),
    path('qr-code-generator/', views.qr_code_generator, name='qr-code-generator'),
    path('yt-thumbnail-downloader/', views.yt_thumbnail_downloader, name='yt-thumbnail-downloader'),
    path('text-tools/', views.text_tools, name='text-tools'),
    path('password-generator/', views.password_generator, name='password-generator'),
    path('png-to-webp-convertor/', views.png_to_webp_convertor, name='png-to-webp-convertor'),
    path('webp-to-png-convertor/', views.webp_to_png_convertor, name='webp-to-png-convertor'),
    path('png-to-jpg-convertor/', views.png_to_jpg_convertor, name='png-to-jpg-convertor'),
    path('jpg-to-png-converter/', views.jpg_to_png_converter, name='jpg-to-png-converter'),
    path('jpg-to-webp-converter/', views.jpg_to_webp_converter, name='jpg-to-webp-converter'),
    path('image-compressor/', views.image_compressor, name='image-compressor'),
    path('ip-lookup/', views.ip_lookup, name='ip-lookup'),
    path('tools/', views.tools, name='tools'),
]