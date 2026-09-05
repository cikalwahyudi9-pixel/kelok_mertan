from django.contrib import admin
from apps.core.admin_mixins import DeleteActionMixin

from .models import KategoriArtikel, Artikel


# @admin.register(KategoriArtikel)
# class KategoriArtikelAdmin(DeleteActionMixin, admin.ModelAdmin):
#     prepopulated_fields = {'slug': ('nama',)}


# @admin.register(Artikel)
# class ArtikelAdmin(DeleteActionMixin, admin.ModelAdmin):
#     list_display = ('judul', 'kategori', 'penulis', 'tanggal_publish',
#                     'is_published', 'is_featured')
#     list_filter = ('kategori', 'is_published', 'is_featured')
#     list_editable = ('is_published', 'is_featured')
#     search_fields = ('judul', 'penulis')
#     prepopulated_fields = {'slug': ('judul',)}
#     date_hierarchy = 'tanggal_publish'
#     fieldsets = (
#         ('Informasi Artikel', {
#             'fields': ('judul', 'slug', 'thumbnail', 'kategori', 'penulis',
#                        'tanggal_publish', 'ringkasan')
#         }),
#         ('Isi Artikel', {
#             'fields': ('isi',)
#         }),
#         ('Pengaturan', {
#             'fields': ('is_published', 'is_featured')
#         }),
#     )
