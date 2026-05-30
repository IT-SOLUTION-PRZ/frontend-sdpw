import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authFetch } from "@/lib/auth-fetch"
import { API_BASE_URL } from "@/lib/api-config"
import { Card } from "@/components/ui/card"
import { Fish, Plus, Settings2, Trash2, Edit2, AlertCircle } from "lucide-react"

export function GenericCrud({ titleAdd, titleList, titleManage, endpoint, fields, queryParams = "" }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})
  const [isFormVisible, setIsFormVisible] = useState(false)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await authFetch(`${API_BASE_URL}/api/v1/admin/${endpoint}/${queryParams}`)
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      } else {
        toast.error("Nie udało się pobrać danych")
      }
    } catch (e) {
      toast.error("Wystąpił błąd sieci")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [endpoint])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Add default values for hidden fields
    const dataToSend = { ...formData }
    fields.forEach(f => {
      if (f.default !== undefined && dataToSend[f.name] === undefined) {
        dataToSend[f.name] = f.default
      }
    })

    const isEdit = !!editingItem
    const url = isEdit 
      ? `${API_BASE_URL}/api/v1/admin/${endpoint}/${editingItem.id}/`
      : `${API_BASE_URL}/api/v1/admin/${endpoint}/`
    
    const method = isEdit ? "PUT" : "POST"

    try {
      const res = await authFetch(url, {
        method,
        body: JSON.stringify(dataToSend)
      })

      if (res.ok) {
        toast.success(isEdit ? "Zaktualizowano pomyślnie" : "Dodano pomyślnie")
        setEditingItem(null)
        setFormData({})
        setIsFormVisible(false)
        fetchItems()
      } else {
        const errorData = await res.json()
        toast.error(`Błąd: ${JSON.stringify(errorData)}`)
      }
    } catch (e) {
      toast.error("Wystąpił błąd podczas zapisywania danych")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno usunąć ten element? Operacji nie można cofnąć.")) return
    try {
      const res = await authFetch(`${API_BASE_URL}/api/v1/admin/${endpoint}/${id}/`, {
        method: "DELETE"
      })
      if (res.ok) {
        toast.success("Usunięto pomyślnie")
        fetchItems()
      } else {
        toast.error("Nie udało się usunąć")
      }
    } catch (e) {
      toast.error("Wystąpił błąd podczas usuwania")
    }
  }

  const startEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setIsFormVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingItem(null)
    setFormData({})
    setIsFormVisible(false)
  }

  const toggleForm = () => {
    if (isFormVisible && !editingItem) {
      setIsFormVisible(false)
    } else {
      setEditingItem(null)
      setFormData({})
      setIsFormVisible(true)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          <Settings2 className="size-5 text-indigo-500" />
          Zarządzaj: {titleManage || titleList}
        </h2>
        {!isFormVisible && (
          <Button onClick={toggleForm} className="bg-indigo-600 hover:bg-indigo-700 rounded-full gap-1 pl-3 pr-4 shadow-sm transition-all hover:shadow-md">
            <Plus className="size-4" /> Dodaj
          </Button>
        )}
      </div>

      {isFormVisible && (
        <Card className="p-6 mb-8 border-indigo-100 shadow-md ring-1 ring-indigo-50">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
              {editingItem ? <Edit2 className="size-5" /> : <Plus className="size-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{editingItem ? `Edytuj ${titleAdd}` : `Dodaj ${titleAdd}`}</h3>
              <p className="text-xs text-slate-500">{editingItem ? "Wprowadź poprawki i zapisz zmiany." : "Wypełnij poniższe pola, aby utworzyć nowy rekord."}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {fields.filter(f => !f.hidden).map(field => (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <Label htmlFor={field.name} className="font-semibold text-slate-700 mb-1.5 block">{field.label}</Label>
                  {field.type === "checkbox" ? (
                    <div className="flex items-center mt-2 group bg-slate-50 p-3 rounded-lg border border-slate-200 transition-colors hover:border-indigo-200 hover:bg-indigo-50/50">
                      <input 
                        type="checkbox"
                        id={field.name}
                        name={field.name}
                        checked={!!formData[field.name]}
                        onChange={handleInputChange}
                        className="size-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                      />
                      <span className="ml-3 text-sm font-medium text-slate-700 select-none cursor-pointer">Zaznacz, jeśli parametr jest prawdziwy</span>
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                      placeholder={`Wprowadź ${field.label.toLowerCase()}...`}
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled hidden>Wybierz {field.label.toLowerCase()}</option>
                      {field.options && field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type || "text"}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="rounded-xl border-slate-200 px-4 h-11 transition-colors focus-visible:ring-indigo-500 focus-visible:border-transparent shadow-sm"
                      placeholder={`Wpisz wartość dla pola ${field.label.toLowerCase()}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-6 font-semibold shadow-sm">
                {editingItem ? "Zapisz zmiany" : "Utwórz rekord"}
              </Button>
              <Button type="button" variant="outline" onClick={cancelEdit} className="border-slate-200 hover:bg-slate-100 font-medium">
                Anuluj
              </Button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
         <Card className="p-12 flex flex-col items-center justify-center text-slate-500">
           <div className="size-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
           <p className="font-medium tracking-wide">Pobieranie bazy danych...</p>
         </Card>
      ) : items.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center shadow-sm border-slate-100">
          <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
            <AlertCircle className="size-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Brak wyników</h3>
          <p className="text-slate-500 mb-6">W bazie danych nie ma jeszcze żadnych wpisów dla tego typu.</p>
          {!isFormVisible && (
            <Button onClick={toggleForm} className="rounded-full bg-indigo-600 hover:bg-indigo-700 px-6">
              Dodaj pierwszy rekord
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map(item => (
            <Card key={item.id} className="overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-200 group">
              <div className="border-b border-slate-50 bg-slate-50/70 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  ID: <span className="text-indigo-600">{item.id}</span>
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="h-8 px-2 text-slate-600 hover:text-indigo-700 hover:bg-indigo-50" onClick={() => startEdit(item)}>
                    <Edit2 className="size-3.5 mr-1.5" /> Edytuj
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 px-2 text-slate-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="size-3.5 mr-1.5" /> Usuń
                  </Button>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-4 justify-between md:items-start">
                <div className="flex-1 min-w-0">
                  {fields.filter(f => !f.hidden).slice(0, 1).map(field => (
                    <h4 key={`title-${field.name}`} className="text-lg font-bold text-slate-800 truncate mb-2">
                       {item[field.name]}
                    </h4>
                  ))}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3">
                    {fields.filter(f => !f.hidden).slice(1, 5).map(field => (
                      <div key={field.name} className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{field.label}</span>
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {field.type === 'checkbox' ? (
                            item[field.name] ? (
                              <span className="inline-flex py-0.5 px-2 bg-green-100 text-green-700 text-xs rounded-md">Tak</span>
                            ) : (
                              <span className="inline-flex py-0.5 px-2 bg-slate-100 text-slate-600 text-xs rounded-md">Nie</span>
                            )
                          ) : field.type === 'select' ? (
                            field.options?.find(opt => opt.value === item[field.name])?.label || item[field.name] || <span className="text-slate-300 italic">Brak danych</span>
                          ) : (
                            item[field.name] || <span className="text-slate-300 italic">Brak danych</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile action buttons (visible on small screens when hover mechanics fail) */}
                <div className="flex md:hidden items-center gap-2 pt-3 border-t border-slate-100 mt-2">
                  <Button size="sm" variant="outline" className="flex-1 h-9" onClick={() => startEdit(item)}>
                    <Edit2 className="size-3.5 mr-1.5" /> Edytuj
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-9 hover:border-red-200 hover:bg-red-50 hover:text-red-700 text-red-600" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="size-3.5 mr-1.5" /> Usuń
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}