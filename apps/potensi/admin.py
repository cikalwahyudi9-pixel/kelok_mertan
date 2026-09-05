from django.contrib import admin
from apps.core.admin_mixins import DeleteActionMixin

from .models import KategoriPotensi, ItemPotensi


@admin.register(KategoriPotensi)
class KategoriPotensiAdmin(DeleteActionMixin, admin.ModelAdmin):
    list_display = ('nama', 'slug', 'urutan', 'is_published')
    list_editable = ('urutan', 'is_published')
    prepopulated_fields = {'slug': ('nama',)}


@admin.register(ItemPotensi)
class ItemPotensiAdmin(DeleteActionMixin, admin.ModelAdmin):
    list_display = ('judul', 'kategori', 'is_published', 'urutan')
    list_filter = ('kategori', 'is_published')
    list_editable = ('is_published', 'urutan')
    prepopulated_fields = {'slug': ('judul',)}
    search_fields = ('judul',)
