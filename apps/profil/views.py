from django.shortcuts import render, get_object_or_404
from django.http import Http404
from .models import ProfilDesa, FasilitasDesa, KelompokTani


def profil_index(request):
    """Halaman profil desa — menampilkan semua sub-informasi."""
    profil = ProfilDesa.objects.first()
    fasilitas = FasilitasDesa.objects.filter(is_published=True)
    return render(request, 'profil/index.html', {
        'profil': profil,
        'fasilitas': fasilitas,
    })

def kelompok_tani_list(request, kategori):
    """Menampilkan daftar kelompok tani berdasarkan kategori (wanita/pria)."""
    if kategori not in ['wanita', 'pria']:
        raise Http404("Kategori kelompok tani tidak valid.")
        
    kelompok_list = KelompokTani.objects.filter(kategori=kategori, is_published=True)
    
    context = {
        'kategori': kategori,
        'kelompok_list': kelompok_list,
        'judul_halaman': f'Kelompok Tani {kategori.capitalize()}',
    }
    return render(request, 'profil/kelompok_tani.html', context)

