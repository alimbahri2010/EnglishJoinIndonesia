import React, { useState, useRef } from 'react';
import { 
  Building2, Plus, Edit3, Trash2, CheckCircle2, 
  Sparkles, AlertTriangle, X, 
  Eye, EyeOff, Upload, Image as ImageIcon, Globe,
  ArrowUpDown, ExternalLink,
  GripVertical, ArrowLeft, ArrowRight,
  LayoutGrid, Table, ArrowUp, ArrowDown
} from 'lucide-react';
import { useCampusLogos } from '../../context/CampusLogosContext';
import { CampusLogo } from '../../types/campus';
import { CampusLogoItem } from '../common/CampusLogoItem';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const CampusLogosManagementTab: React.FC = () => {
  const { 
    campusLogos, 
    addCampusLogo, 
    updateCampusLogo, 
    deleteCampusLogo, 
    toggleCampusLogoActive,
    reorderCampusLogos
  } = useCampusLogos();
  const { isDark } = useTheme();
  const { tr } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<CampusLogo | null>(null);
  const [deletingLogo, setDeletingLogo] = useState<CampusLogo | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Drag & Drop state
  const [draggedLogoId, setDraggedLogoId] = useState<string | null>(null);
  const [dragOverLogoId, setDragOverLogoId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLogoId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverLogoId !== id) {
      setDragOverLogoId(id);
    }
  };

  const handleDragEnd = () => {
    setDraggedLogoId(null);
    setDragOverLogoId(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedLogoId || draggedLogoId === targetId) {
      setDraggedLogoId(null);
      setDragOverLogoId(null);
      return;
    }

    const currentList = [...sortedLogos];
    const sourceIdx = currentList.findIndex(l => l.id === draggedLogoId);
    const targetIdx = currentList.findIndex(l => l.id === targetId);

    if (sourceIdx !== -1 && targetIdx !== -1) {
      const [moved] = currentList.splice(sourceIdx, 1);
      currentList.splice(targetIdx, 0, moved);
      reorderCampusLogos(currentList);
      showToast(tr(`Urutan logo "${moved.name}" dipindahkan ke posisi #${targetIdx + 1}.`, `Order of logo "${moved.name}" moved to position #${targetIdx + 1}.`));
    }

    setDraggedLogoId(null);
    setDragOverLogoId(null);
  };

  const moveLogoByIndex = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= sortedLogos.length || toIndex < 0 || toIndex >= sortedLogos.length) return;
    const currentList = [...sortedLogos];
    const [moved] = currentList.splice(fromIndex, 1);
    currentList.splice(toIndex, 0, moved);
    reorderCampusLogos(currentList);
    showToast(tr(`Urutan logo "${moved.name}" dipindahkan ke posisi #${toIndex + 1}.`, `Order of logo "${moved.name}" moved to position #${toIndex + 1}.`));
  };

  const openCreateModal = () => {
    const newLogo: CampusLogo = {
      id: '',
      name: '',
      shortName: '',
      tagline: '',
      logoUrl: '',
      category: 'PTN / Dalam Negeri',
      country: 'Indonesia',
      isActive: true,
      order: campusLogos.length + 1
    };
    setEditingLogo(newLogo);
    setIsModalOpen(true);
  };

  const openEditModal = (logo: CampusLogo) => {
    setEditingLogo({ ...logo });
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingLogo) return;

    if (!file.type.startsWith('image/')) {
      alert(tr('Silakan pilih file gambar (PNG, JPG, SVG, WebP).', 'Please select an image file (PNG, JPG, SVG, WebP).'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setEditingLogo({
        ...editingLogo,
        logoUrl: result,
        svgPresetKey: undefined
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLogo) return;

    if (!editingLogo.name.trim()) {
      alert(tr('Nama universitas/kampus wajib diisi!', 'University name is required!'));
      return;
    }

    const toSave: CampusLogo = {
      ...editingLogo,
      shortName: editingLogo.shortName?.trim() || editingLogo.name.trim(),
      name: editingLogo.name.trim(),
      tagline: editingLogo.tagline?.trim() || ''
    };

    if (editingLogo.id) {
      updateCampusLogo(toSave);
      showToast(tr(`Logo kampus "${toSave.name}" berhasil diperbarui.`, `Campus logo "${toSave.name}" updated successfully.`));
    } else {
      addCampusLogo(toSave);
      showToast(tr(`Logo kampus "${toSave.name}" berhasil ditambahkan ke carousel.`, `Campus logo "${toSave.name}" added to carousel.`));
    }

    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!deletingLogo) return;
    deleteCampusLogo(deletingLogo.id);
    showToast(tr(`Logo kampus "${deletingLogo.name}" berhasil dihapus.`, `Campus logo "${deletingLogo.name}" has been deleted.`));
    setDeletingLogo(null);
  };

  const handleToggle = (id: string, name: string, currentActive: boolean) => {
    toggleCampusLogoActive(id);
    showToast(
      !currentActive
        ? tr(`"${name}" diaktifkan dan tampil di Carousel Beranda.`, `"${name}" is active and visible in Landing Page Carousel.`)
        : tr(`"${name}" dinonaktifkan (disembunyikan dari Carousel).`, `"${name}" is deactivated (hidden from Carousel).`)
    );
  };

  const sortedLogos = [...campusLogos].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-400 font-bold text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Action Bar */}
      <div className={`p-6 rounded-3xl border transition-colors ${
        isDark 
          ? 'bg-[#141414] border-white/10 shadow-xl' 
          : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#F7B425]/15 text-[#F7B425] flex items-center justify-center font-black flex-shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`text-[18px] leading-[26px] font-bold font-['Poppins',sans-serif] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {tr('Kelola Logo Kampus Alumni', 'Manage Alumni Campus Logos')}
              </h1>
              <p className={`text-[12px] leading-[18px] font-['Poppins',sans-serif] mt-0.5 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {tr(
                  'Atur dan sesuaikan logo kampus yang lulus/dilulusi oleh alumni English Join Indonesia pada carousel di bawah Hero Section.',
                  'Manage and customize campus logos where English Join Indonesia alumni study in the carousel below the Hero Section.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 rounded-xl bg-[#F7B425] hover:bg-[#ffbe33] text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-[#F7B425]/20 hover:shadow-lg transition-all cursor-pointer active:scale-95 font-['Poppins',sans-serif]"
            >
              <Plus className="w-4 h-4" />
              <span className="text-[12px] font-bold font-['Poppins',sans-serif]">{tr('Tambah Logo Kampus', 'Add Campus Logo')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-toolbar: View Mode Toggle (Di luar wrapper Kelola Logo Kampus) */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold font-['Poppins',sans-serif] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {tr('Daftar Logo Kampus Alumni', 'Alumni Campus Logos List')}
          </span>
          <span className="text-xs font-black font-mono text-[#F7B425] bg-[#F7B425]/10 px-2 py-0.5 rounded-lg border border-[#F7B425]/20">
            {sortedLogos.length}
          </span>
        </div>

        {/* Toggle Tampilan Grid dan Tabel */}
        <div className={`flex items-center p-1 rounded-xl border text-xs ${
          isDark ? 'bg-[#141414] border-white/10 shadow-inner' : 'bg-white border-slate-200/90 shadow-xs'
        }`}>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
              viewMode === 'grid' 
                ? 'bg-[#F7B425] text-black font-extrabold shadow-xs' 
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
            title={tr('Tampilan Grid (Kartu)', 'Grid (Card) View')}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="font-['Poppins',sans-serif] text-[12px] font-bold">{tr('Grid', 'Grid')}</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
              viewMode === 'table' 
                ? 'bg-[#F7B425] text-black font-extrabold shadow-xs' 
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
            title={tr('Tampilan Tabel (Daftar Terorganisir)', 'Table View')}
          >
            <Table className="w-3.5 h-3.5" />
            <span className="font-['Poppins',sans-serif] text-[12px] font-bold">{tr('Tabel', 'Table')}</span>
          </button>
        </div>
      </div>

      {/* Logos List: Grid or Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3.5">
        {sortedLogos.map((logo, index) => {
          const isBeingDragged = draggedLogoId === logo.id;
          const isDragOver = dragOverLogoId === logo.id && !isBeingDragged;

          return (
            <div
              key={logo.id}
              draggable
              onDragStart={(e) => handleDragStart(e, logo.id)}
              onDragOver={(e) => handleDragOver(e, logo.id)}
              onDrop={(e) => handleDrop(e, logo.id)}
              onDragEnd={handleDragEnd}
              className={`p-3 rounded-2xl border transition-all flex flex-col justify-between group select-none relative ${
                isBeingDragged
                  ? 'opacity-30 scale-95 border-dashed border-[#F7B425] shadow-none ring-2 ring-[#F7B425]/50'
                  : isDragOver
                  ? 'border-[#F7B425] scale-[1.02] shadow-xl ring-2 ring-[#F7B425] bg-[#F7B425]/10'
                  : !logo.isActive
                  ? 'opacity-60 grayscale-[30%]'
                  : isDark 
                  ? 'bg-[#141414] border-white/10 hover:border-[#F7B425]/50 hover:shadow-lg' 
                  : 'bg-white border-slate-200/90 hover:border-[#F7B425]/70 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                {/* Header: Mini Order Badge & Quick Actions */}
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <div 
                    className="flex items-center gap-1 cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#F7B425] transition-colors"
                    title={tr('Tahan & geser untuk mengubah urutan', 'Drag to reorder')}
                  >
                    <GripVertical className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                    <span className="text-[10px] font-black text-[#F7B425] font-mono bg-[#F7B425]/10 px-1.5 py-0.5 rounded border border-[#F7B425]/25">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    {/* Active/Hidden Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggle(logo.id, logo.name, logo.isActive)}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        logo.isActive
                          ? 'text-emerald-500 hover:bg-emerald-500/15'
                          : 'text-slate-400 hover:text-rose-500 hover:bg-rose-500/15'
                      }`}
                      title={logo.isActive ? tr('Aktif (Tampil di Carousel) - Klik untuk sembunyikan', 'Active - Click to hide') : tr('Disembunyikan - Klik untuk tampilkan', 'Hidden - Click to show')}
                      aria-label="Toggle active status"
                    >
                      {logo.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => openEditModal(logo)}
                      className={`p-1 rounded-lg transition-colors cursor-pointer ${
                        isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title={tr('Edit Logo Kampus', 'Edit Campus Logo')}
                      aria-label="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => setDeletingLogo(logo)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title={tr('Hapus Logo Kampus', 'Delete Campus Logo')}
                      aria-label="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Logo Preview */}
                <div className="w-full h-16 sm:h-20 rounded-xl bg-white border border-slate-200/80 p-2 flex items-center justify-center mb-2.5 shadow-xs overflow-hidden group-hover:border-[#F7B425]/40 transition-colors">
                  <CampusLogoItem logo={logo} />
                </div>

                {/* Campus Information (Compact) */}
                <div className="text-center">
                  <h3 
                    className={`font-bold text-xs sm:text-[13px] leading-snug truncate font-['Poppins',sans-serif] ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                    title={logo.name}
                  >
                    {logo.shortName || logo.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 mt-1 text-[10px] text-slate-400 truncate">
                    <span className={`px-1.5 py-0.2 rounded font-semibold ${
                      logo.category === 'PTN / Dalam Negeri'
                        ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {logo.category === 'PTN / Dalam Negeri' ? 'PTN' : 'LN'}
                    </span>
                    <span>•</span>
                    <span className="truncate">{logo.country}</span>
                  </div>
                </div>
              </div>

              {/* Mini Quick Reorder Controls on bottom */}
              <div 
                className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] text-slate-400 ${
                  isDark ? 'border-white/5' : 'border-slate-100'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="truncate text-[10px] text-slate-400 font-mono">
                  {logo.svgPresetKey ? 'Vector' : 'Image'}
                </span>

                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveLogoByIndex(index, index - 1)}
                    className={`p-1 rounded transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 active:scale-95 ${
                      isDark 
                        ? 'hover:bg-white/10 hover:text-white text-slate-400' 
                        : 'hover:bg-slate-200 hover:text-black text-slate-600'
                    }`}
                    title={tr('Geser ke kiri', 'Move left')}
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={index === sortedLogos.length - 1}
                    onClick={() => moveLogoByIndex(index, index + 1)}
                    className={`p-1 rounded transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-20 active:scale-95 ${
                      isDark 
                        ? 'hover:bg-white/10 hover:text-white text-slate-400' 
                        : 'hover:bg-slate-200 hover:text-black text-slate-600'
                    }`}
                    title={tr('Geser ke kanan', 'Move right')}
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      ) : (
        /* Logos List Table View */
        <div className={`rounded-3xl border overflow-hidden ${
          isDark ? 'bg-[#141414] border-white/10 shadow-xl' : 'bg-white border-slate-200/90 shadow-xs'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className={`border-b text-[11px] uppercase tracking-wider font-['Poppins',sans-serif] ${
                isDark ? 'border-white/10 text-slate-400 bg-white/5' : 'border-slate-200 text-slate-500 bg-slate-50/80'
              }`}>
                <tr>
                  <th className="py-3.5 px-4 font-bold text-center w-28">{tr('Urutan', 'Order')}</th>
                  <th className="py-3.5 px-4 font-bold text-center w-28">{tr('Logo', 'Logo')}</th>
                  <th className="py-3.5 px-4 font-bold">{tr('Nama Kampus & Info', 'Campus Name & Info')}</th>
                  <th className="py-3.5 px-4 font-bold w-40">{tr('Kategori', 'Category')}</th>
                  <th className="py-3.5 px-4 font-bold w-36 text-center">{tr('Status', 'Status')}</th>
                  <th className="py-3.5 px-4 font-bold text-right w-28">{tr('Aksi', 'Action')}</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                {sortedLogos.map((logo, index) => {
                  const isBeingDragged = draggedLogoId === logo.id;
                  const isDragOver = dragOverLogoId === logo.id && !isBeingDragged;

                  return (
                    <tr
                      key={logo.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, logo.id)}
                      onDragOver={(e) => handleDragOver(e, logo.id)}
                      onDrop={(e) => handleDrop(e, logo.id)}
                      onDragEnd={handleDragEnd}
                      className={`transition-all select-none ${
                        isBeingDragged
                          ? 'opacity-30 bg-[#F7B425]/10'
                          : isDragOver
                          ? 'bg-[#F7B425]/15 ring-2 ring-[#F7B425]'
                          : !logo.isActive
                          ? 'opacity-60 grayscale-[30%]'
                          : isDark ? 'hover:bg-white/5' : 'hover:bg-amber-50/40'
                      }`}
                    >
                      {/* Urutan & Reorder Controls */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div 
                            className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-[#F7B425] p-1 rounded-lg transition-colors"
                            title={tr('Tahan & geser untuk memindahkan urutan', 'Drag to reorder')}
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-black text-[#F7B425] font-mono bg-[#F7B425]/10 px-2 py-0.5 rounded-md border border-[#F7B425]/20">
                            #{index + 1}
                          </span>
                          <div className="flex flex-col gap-0.5 ml-1">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => moveLogoByIndex(index, index - 1)}
                              className={`p-1 rounded-md transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed ${
                                isDark ? 'hover:bg-white/10 text-slate-300 hover:text-[#F7B425]' : 'hover:bg-slate-200 text-slate-600 hover:text-black'
                              }`}
                              title={tr('Geser ke atas', 'Move up')}
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={index === sortedLogos.length - 1}
                              onClick={() => moveLogoByIndex(index, index + 1)}
                              className={`p-1 rounded-md transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed ${
                                isDark ? 'hover:bg-white/10 text-slate-300 hover:text-[#F7B425]' : 'hover:bg-slate-200 text-slate-600 hover:text-black'
                              }`}
                              title={tr('Geser ke bawah', 'Move down')}
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Logo Thumbnail */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="w-16 h-11 rounded-xl bg-white border border-slate-200/90 p-1 flex items-center justify-center mx-auto shadow-xs overflow-hidden">
                          <CampusLogoItem logo={logo} />
                        </div>
                      </td>

                      {/* Campus Name & Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-bold font-['Poppins',sans-serif] text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {logo.name}
                            </span>
                            {logo.shortName && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400 font-mono font-bold">
                                {logo.shortName}
                              </span>
                            )}
                          </div>
                          {logo.tagline && (
                            <span className="text-[11px] text-slate-400 italic mt-0.5 max-w-md truncate">
                              "{logo.tagline}"
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          logo.category === 'PTN / Dalam Negeri'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                            : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                        }`}>
                          {logo.category === 'PTN / Dalam Negeri' ? 'PTN / Domestik' : 'Luar Negeri'}
                        </span>
                        <span className={`block text-[10px] mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {logo.country}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggle(logo.id, logo.name, logo.isActive)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            logo.isActive
                              ? 'bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-500 hover:bg-rose-500/25 border border-rose-500/30'
                          }`}
                          title={logo.isActive ? tr('Klik untuk sembunyikan', 'Click to hide') : tr('Klik untuk tampilkan', 'Click to show')}
                        >
                          {logo.isActive ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>{tr('Aktif', 'Active')}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>{tr('Disembunyikan', 'Hidden')}</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(logo)}
                            className={`p-2 rounded-xl transition-colors cursor-pointer ${
                              isDark 
                                ? 'bg-white/5 hover:bg-white/15 text-slate-300 hover:text-[#F7B425]' 
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black'
                            }`}
                            title={tr('Edit Logo Kampus', 'Edit Campus Logo')}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingLogo(logo)}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/15 transition-colors cursor-pointer"
                            title={tr('Hapus Logo Kampus', 'Delete Campus Logo')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {sortedLogos.length === 0 && (
        <div className={`p-12 text-center rounded-3xl border ${
          isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-40" />
          <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {tr('Belum ada logo kampus', 'No campus logos added yet')}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {tr('Klik tombol "+ Tambah Logo Kampus" di atas untuk menambahkan logo baru.', 'Click "+ Add Campus Logo" above to add a new logo.')}
          </p>
        </div>
      )}

      {/* MODAL: Tambah / Edit Logo Kampus */}
      {isModalOpen && editingLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl border p-6 my-8 shadow-2xl relative transition-all ${
            isDark ? 'bg-[#161616] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#F7B425]/15 text-[#F7B425] flex items-center justify-center font-black">
                {editingLogo.id ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </div>
              <h2 className="text-xl font-black font-heading">
                {editingLogo.id 
                  ? tr('Edit Logo Kampus', 'Edit Campus Logo') 
                  : tr('Tambah Logo Kampus Baru', 'Add New Campus Logo')
                }
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Nama Kampus */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  {tr('Nama Lengkap Universitas / Kampus *', 'Full University / Campus Name *')}
                </label>
                <input
                  type="text"
                  required
                  value={editingLogo.name}
                  onChange={(e) => setEditingLogo({ ...editingLogo, name: e.target.value })}
                  placeholder="Contoh: Universitas Airlangga / Harvard University"
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${
                    isDark 
                      ? 'bg-[#222] text-white border border-white/10 focus:border-[#F7B425]' 
                      : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-[#F7B425]'
                  }`}
                />
              </div>

              {/* Short Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {tr('Singkatan / Short Name', 'Short Name')}
                  </label>
                  <input
                    type="text"
                    value={editingLogo.shortName || ''}
                    onChange={(e) => setEditingLogo({ ...editingLogo, shortName: e.target.value })}
                    placeholder="Contoh: UNAIR, ITB, UI"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${
                      isDark 
                        ? 'bg-[#222] text-white border border-white/10 focus:border-[#F7B425]' 
                        : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-[#F7B425]'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {tr('Tagline / Slogan', 'Tagline / Slogan')}
                  </label>
                  <input
                    type="text"
                    value={editingLogo.tagline || ''}
                    onChange={(e) => setEditingLogo({ ...editingLogo, tagline: e.target.value })}
                    placeholder="Contoh: Excellence with Morality"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${
                      isDark 
                        ? 'bg-[#222] text-white border border-white/10 focus:border-[#F7B425]' 
                        : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-[#F7B425]'
                    }`}
                  />
                </div>
              </div>

              {/* Kategori & Negara */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {tr('Kategori', 'Category')}
                  </label>
                  <select
                    value={editingLogo.category}
                    onChange={(e) => setEditingLogo({ 
                      ...editingLogo, 
                      category: e.target.value as 'PTN / Dalam Negeri' | 'Luar Negeri / International' 
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none cursor-pointer ${
                      isDark 
                        ? 'bg-[#222] text-white border border-white/10 focus:border-[#F7B425]' 
                        : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-[#F7B425]'
                    }`}
                  >
                    <option value="PTN / Dalam Negeri">PTN / Dalam Negeri</option>
                    <option value="Luar Negeri / International">Luar Negeri / International</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {tr('Negara', 'Country')}
                  </label>
                  <input
                    type="text"
                    value={editingLogo.country}
                    onChange={(e) => setEditingLogo({ ...editingLogo, country: e.target.value })}
                    placeholder="Contoh: Indonesia, UK, Germany"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${
                      isDark 
                        ? 'bg-[#222] text-white border border-white/10 focus:border-[#F7B425]' 
                        : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-[#F7B425]'
                    }`}
                  />
                </div>
              </div>

              {/* Upload File Logo Kampus */}
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  {tr('Upload File Logo Kampus', 'Upload Campus Logo File')}
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    isDark 
                      ? 'border-white/20 hover:border-[#F7B425] bg-[#1a1a1a] hover:bg-[#202020]' 
                      : 'border-slate-300 hover:border-[#F7B425] bg-slate-50 hover:bg-amber-50/40'
                  }`}
                >
                  <Upload className="w-7 h-7 text-[#F7B425] mx-auto mb-2" />
                  <p className={`text-xs font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    {tr('Klik untuk pilih logo dari perangkat / komputer', 'Click to select logo from device / computer')}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    PNG, JPG, SVG, WebP (Maksimal 5MB)
                  </p>
                </div>
              </div>

              {/* LIVE PREVIEW BOX */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  {tr('Preview Tampilan Logo di Carousel', 'Live Preview in Carousel')}
                </span>
                <div className="w-full h-18 rounded-2xl bg-white border border-slate-200 p-2 flex items-center justify-center shadow-xs">
                  <CampusLogoItem logo={editingLogo} />
                </div>
              </div>

              {/* Urutan & Status Aktif */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {tr('Nomor Urut', 'Order Number')}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingLogo.order}
                    onChange={(e) => setEditingLogo({ ...editingLogo, order: parseInt(e.target.value) || 1 })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${
                      isDark 
                        ? 'bg-[#222] text-white border border-white/10 focus:border-[#F7B425]' 
                        : 'bg-slate-50 text-slate-900 border border-slate-200 focus:border-[#F7B425]'
                    }`}
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={editingLogo.isActive}
                      onChange={(e) => setEditingLogo({ ...editingLogo, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-[#F7B425] focus:ring-[#F7B425] accent-[#F7B425]"
                    />
                    <span className="text-xs font-bold">
                      {tr('Tampilkan di Beranda', 'Display on Landing')}
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    isDark ? 'bg-[#222] text-slate-300 hover:bg-[#2a2a2a]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tr('Batal', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#F7B425] hover:bg-[#ffbe33] text-black font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{tr('Simpan Logo Kampus', 'Save Campus Logo')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Konfirmasi Hapus */}
      {deletingLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className={`w-full max-w-sm rounded-3xl border p-6 shadow-2xl text-center ${
            isDark ? 'bg-[#161616] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-black text-lg font-heading mb-2">
              {tr('Hapus Logo Kampus Ini?', 'Delete this Campus Logo?')}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {tr(
                `Apakah Anda yakin ingin menghapus logo kampus "${deletingLogo.name}"? Logo ini tidak akan muncul lagi di Carousel Beranda.`,
                `Are you sure you want to delete "${deletingLogo.name}"? It will no longer appear in the Landing Carousel.`
              )}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingLogo(null)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  isDark ? 'bg-[#222] text-slate-300 hover:bg-[#2a2a2a]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tr('Batal', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>{tr('Ya, Hapus', 'Yes, Delete')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
