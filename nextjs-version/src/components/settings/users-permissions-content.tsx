"use client"

import * as React from "react"
import {
  ExternalLink,
  Eye,
  Shield,
  UserPlus,
  Wrench,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

type Role = "Administrador" | "Supervisor" | "Técnico" | "Externo"

type UserRow = {
  id: string
  initials: string
  name: string
  email: string
  role: Role
  active: boolean
  lastAccess: string
  actions: ("edit" | "toggle")[]
}

const USERS: UserRow[] = [
  {
    id: "1",
    initials: "VB",
    name: "Vanderson Bazilio",
    email: "vanderson@clickdev.com.br",
    role: "Administrador",
    active: true,
    lastAccess: "Hoje, 17:45",
    actions: ["edit"],
  },
  {
    id: "2",
    initials: "T2",
    name: "Carlos Silva",
    email: "carlos@forgeind.com.br",
    role: "Técnico",
    active: true,
    lastAccess: "Hoje, 14:20",
    actions: ["edit", "toggle"],
  },
  {
    id: "3",
    initials: "T3",
    name: "Roberto Mendes",
    email: "roberto@forgeind.com.br",
    role: "Técnico",
    active: true,
    lastAccess: "Ontem, 09:15",
    actions: ["edit", "toggle"],
  },
  {
    id: "4",
    initials: "GS",
    name: "Ana Paula Costa",
    email: "ana@forgeind.com.br",
    role: "Supervisor",
    active: true,
    lastAccess: "16/04/2026",
    actions: ["edit", "toggle"],
  },
  {
    id: "5",
    initials: "EX",
    name: "João External",
    email: "joao@calibrarj.com.br",
    role: "Externo",
    active: false,
    lastAccess: "01/03/2026",
    actions: ["edit", "toggle"],
  },
]

function RoleBadge({ role }: { role: Role }) {
  const map: Record<
    Role,
    { className: string; icon: React.ReactNode; label: string }
  > = {
    Administrador: {
      className:
        "border-purple-500/40 bg-purple-500/15 text-purple-800 dark:text-purple-200",
      icon: <Shield className="size-3" />,
      label: "Administrador",
    },
    Supervisor: {
      className:
        "border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-200",
      icon: <Eye className="size-3" />,
      label: "Supervisor",
    },
    Técnico: {
      className:
        "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
      icon: <Wrench className="size-3" />,
      label: "Técnico",
    },
    Externo: {
      className: "border-border bg-muted text-muted-foreground",
      icon: <ExternalLink className="size-3" />,
      label: "Externo",
    },
  }
  const c = map[role]
  return (
    <Badge variant="outline" className={cn("gap-1 font-normal", c.className)}>
      {c.icon}
      {c.label}
    </Badge>
  )
}

export function UsersPermissionsContent() {
  const [users, setUsers] = React.useState(USERS)

  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    )
  }

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-[24px] font-extrabold leading-tight tracking-tight text-foreground">
            Usuários e Permissões
          </h1>
          <p className="text-[14px] text-muted-foreground">
            Gerencie quem acessa o sistema e o que cada pessoa pode fazer
          </p>
        </div>
        <Button type="button" className="shrink-0">
          <UserPlus className="size-4" />
          Convidar Usuário
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[72px]">Avatar</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs font-semibold">
                      {u.initials}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell
                  className={cn(
                    "font-medium",
                    !u.active && "text-muted-foreground line-through"
                  )}
                >
                  {u.name}
                </TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell>
                  <RoleBadge role={u.role} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        u.active ? "bg-emerald-500" : "bg-muted-foreground/50"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm",
                        u.active ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {u.active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {u.lastAccess}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8">
                      Editar
                    </Button>
                    {u.actions.includes("toggle") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8"
                        onClick={() => toggleActive(u.id)}
                      >
                        {u.active ? "Desativar" : "Reativar"}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-xl border border-border bg-muted/20 p-4">
        <h2 className="mb-3 text-[14px] font-semibold text-foreground">
          Níveis de Permissão
        </h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span aria-hidden>🔴</span>
            <span>
              <strong className="text-foreground">Administrador:</strong> acesso
              total + configurações + usuários + alertas
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden>🔵</span>
            <span>
              <strong className="text-foreground">Supervisor:</strong> visualiza
              tudo + cria OS + aprova relatórios
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden>🟢</span>
            <span>
              <strong className="text-foreground">Técnico:</strong> executa OS +
              preenche checklists + registra fotos
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden>⚪</span>
            <span>
              <strong className="text-foreground">Externo:</strong> acesso
              somente leitura a relatórios compartilhados
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
