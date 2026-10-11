import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ArrowLeft, ArrowRight, GripVertical, Trash2 } from 'lucide-react'
import { formatBytes } from '../lib/files'

function Item({ item, index, total, onRemove, onMove, disabled }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    disabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`group relative overflow-hidden rounded-xl border bg-white ${
        isDragging ? 'border-brand shadow-lg' : 'border-line'
      }`}
    >
      <div className="relative aspect-[4/3] bg-page">
        <img
          src={item.url}
          alt={`Halaman ${index + 1}: ${item.name}`}
          className="h-full w-full object-contain"
          draggable={false}
        />
        <span className="absolute left-2 top-2 grid h-6 min-w-6 place-items-center rounded-md bg-ink/80 px-1.5 text-xs font-medium text-white">
          {index + 1}
        </span>
        <button
          type="button"
          {...attributes}
          {...listeners}
          disabled={disabled}
          className="absolute right-2 top-2 grid h-8 w-8 cursor-grab touch-none place-items-center rounded-md bg-white/90 text-muted shadow-sm hover:text-ink active:cursor-grabbing"
          aria-label={`Seret untuk mengubah urutan halaman ${index + 1}`}
        >
          <GripVertical size={16} />
        </button>
      </div>

      <div className="flex items-center gap-1 p-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium" title={item.name}>
            {item.name}
          </p>
          <p className="text-[11px] text-muted">{formatBytes(item.size)}</p>
        </div>
        <button
          type="button"
          onClick={() => onMove(index, index - 1)}
          disabled={disabled || index === 0}
          className="grid h-7 w-7 place-items-center rounded-md text-muted hover:bg-page hover:text-ink disabled:opacity-30"
          aria-label="Geser ke kiri"
        >
          <ArrowLeft size={14} />
        </button>
        <button
          type="button"
          onClick={() => onMove(index, index + 1)}
          disabled={disabled || index === total - 1}
          className="grid h-7 w-7 place-items-center rounded-md text-muted hover:bg-page hover:text-ink disabled:opacity-30"
          aria-label="Geser ke kanan"
        >
          <ArrowRight size={14} />
        </button>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          disabled={disabled}
          className="grid h-7 w-7 place-items-center rounded-md text-muted hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
          aria-label={`Hapus ${item.name}`}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </li>
  )
}

export default function ImageList({ items, onReorder, onRemove, onClear, disabled }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const move = (from, to) => {
    if (to < 0 || to >= items.length) return
    onReorder(arrayMove(items, from, to))
  }

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const from = items.findIndex((i) => i.id === active.id)
    const to = items.findIndex((i) => i.id === over.id)
    move(from, to)
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium">
          {items.length} foto dipilih
          <span className="ml-2 font-normal text-muted">Seret untuk mengatur urutan halaman</span>
        </p>
        <button
          type="button"
          onClick={onClear}
          disabled={disabled}
          className="text-sm text-muted underline-offset-4 hover:text-red-600 hover:underline disabled:opacity-40"
        >
          Hapus semua
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <Item
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                onRemove={onRemove}
                onMove={move}
                disabled={disabled}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  )
}
