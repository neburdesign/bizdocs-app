import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

type OwnerFilter = 'Todos' | 'Para eu aprovar' | 'Submetidos por mim' | 'Submetidos por outros' | 'Sem aprovador';
type StatusFilter = 'Em aprovação' | 'Aprovados' | 'Rejeitados';

interface ApprovalDocument {
  id: number;
  title: string;
  date: string;
  status: StatusFilter;
  owner: Exclude<OwnerFilter, 'Todos'>;
  favorite: boolean;
  approver?: string;
}

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.css'
})
export class ApprovalsComponent {
  readonly ownerOptions: OwnerFilter[] = [
    'Todos', 'Para eu aprovar', 'Submetidos por mim', 'Submetidos por outros', 'Sem aprovador'
  ];
  readonly statusOptions: StatusFilter[] = ['Em aprovação', 'Aprovados', 'Rejeitados'];

  ownerFilter: OwnerFilter = 'Todos';
  statusFilter: StatusFilter = 'Em aprovação';
  openMenu: 'owner' | 'status' | null = null;
  activeSection = 'Pedidos de aprovação';
  activeNav = 'Início';
  searchTerm = '';
  toast = '';

  documents: ApprovalDocument[] = [
    { id: 4, title: 'My Document Bizdocs 04', date: '2023-12-09 08:40:23', status: 'Em aprovação', owner: 'Para eu aprovar', favorite: false, approver: 'Rúben Rodrigues' },
    { id: 5, title: 'My Document Bizdocs 05', date: '2023-11-16 00:31:13', status: 'Em aprovação', owner: 'Submetidos por mim', favorite: false, approver: 'Ana Silva' },
    { id: 6, title: 'My Document Bizdocs 06', date: '2023-10-22 22:17:30', status: 'Em aprovação', owner: 'Submetidos por outros', favorite: false, approver: 'João Costa' },
    { id: 7, title: 'My Document Bizdocs 07', date: '2022-09-13 12:07:00', status: 'Em aprovação', owner: 'Sem aprovador', favorite: false },
    { id: 8, title: 'My Document Bizdocs 08', date: '2022-05-19 14:13:10', status: 'Em aprovação', owner: 'Para eu aprovar', favorite: false, approver: 'Rúben Rodrigues' },
    { id: 9, title: 'Fatura Fornecedor 2024', date: '2024-01-08 09:22:14', status: 'Aprovados', owner: 'Submetidos por mim', favorite: true, approver: 'Ana Silva' },
    { id: 10, title: 'Contrato de prestação', date: '2024-01-04 16:05:42', status: 'Rejeitados', owner: 'Submetidos por outros', favorite: false, approver: 'João Costa' }
  ];

  get filteredDocuments(): ApprovalDocument[] {
    return this.documents.filter((doc) => {
      const statusMatch = doc.status === this.statusFilter;
      const ownerMatch = this.ownerFilter === 'Todos' || doc.owner === this.ownerFilter;
      const queryMatch = `${doc.title} ${doc.date} ${doc.approver ?? ''}`.toLowerCase().includes(this.searchTerm.toLowerCase());
      return statusMatch && ownerMatch && queryMatch;
    });
  }

  get pendingCount(): number { return 12; }
  get rejectedCount(): number { return 3; }
  get favoritesCount(): number { return this.documents.filter(d => d.favorite).length + 5; }

  toggleMenu(menu: 'owner' | 'status'): void {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  selectOwner(option: OwnerFilter): void {
    this.ownerFilter = option;
    this.openMenu = null;
  }

  selectStatus(option: StatusFilter): void {
    this.statusFilter = option;
    this.openMenu = null;
  }

  toggleFavorite(doc: ApprovalDocument): void {
    doc.favorite = !doc.favorite;
  }

  toggleSelection(doc: ApprovalDocument): void {
    this.toast = `Documento "${doc.title}" ${this.toast.includes(doc.title) ? 'desselecionado' : 'selecionado'}.`;
  }

  showAction(doc: ApprovalDocument): void {
    this.toast = `Ações disponíveis para ${doc.title}.`;
  }

  setSection(section: string): void {
    this.activeSection = section;
    this.toast = `Secção "${section}" selecionada.`;
  }

  setNav(item: string): void {
    this.activeNav = item;
    this.toast = `${item}: navegação de demonstração.`;
  }

  @HostListener('document:click')
  closeMenus(): void {
    // Menus are closed by explicit outside-click handling in the template wrapper.
  }
}