import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts';
import type { ApexOptions } from 'apexcharts';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SelectComponent } from '../../shared/components/select/select.component';
import { SectionCardComponent } from '../../shared/components/dashboard/section-card/section-card.component';
import { StatCardComponent } from '../../shared/components/dashboard/stat-card/stat-card.component';
import { StatusBadgeComponent } from '../../shared/components/dashboard/status-badge/status-badge.component';

type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

interface StatItem {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  trendLabel: string;
  trendTone: 'positive' | 'negative' | 'neutral';
}

interface InventoryItem {
  product: string;
  sku: string;
  category: string;
  provider: string;
  value: string;
  stock: string;
  shipped: string;
  status: string;
  tone: Tone;
}

interface AlertItem {
  title: string;
  description: string;
  icon: string;
  tone: Tone;
}

interface OrderItem {
  id: string;
  orderNumber: string;
  assignee: string;
  items: number;
  progress: number;
  tracking: string;
  orderDate: string;
  dueDate: string;
  status: string;
  tone: Tone;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SelectComponent, StatCardComponent, SectionCardComponent, StatusBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('weeklyChartHost')
  private weeklyChartHost?: ElementRef<HTMLDivElement>;

  private weeklyChart?: ApexCharts;

  inventorySearch = '';
  inventoryCategoryFilter = '';
  orderSearch = '';
  orderAssigneeFilter = '';
  orderDateFilter = '';
  orderDueDateFilter = '';
  orderStatusFilter = '';

  readonly stats: StatItem[] = [
    {
      title: 'Items In Stock',
      value: '15.2K',
      subtitle: 'Across 84 categories',
      icon: 'inventory_2',
      trendLabel: '+10%',
      trendTone: 'positive'
    },
    {
      title: 'Total Orders',
      value: '254',
      subtitle: 'Last 7 days',
      icon: 'receipt_long',
      trendLabel: '+10%',
      trendTone: 'positive'
    },
    {
      title: 'Late Orders',
      value: '22',
      subtitle: 'Needs immediate review',
      icon: 'history',
      trendLabel: '-7%',
      trendTone: 'negative'
    },
    {
      title: 'Stock Value',
      value: '$146K',
      subtitle: 'Current warehouse value',
      icon: 'paid',
      trendLabel: '+4%',
      trendTone: 'positive'
    }
  ];

  readonly inventoryRows: InventoryItem[] = [
    { product: 'MULTISPEED 07', sku: 'n°12341', category: 'Cable', provider: 'Helukabel', value: '$4.9', stock: '1,234', shipped: '1,459', status: 'In stock', tone: 'success' },
    { product: 'Serre Câble ø6 à Et...', sku: 'n°12342', category: 'Support', provider: 'Helukabel', value: '$1.9', stock: '4,567', shipped: '2,890', status: 'In stock', tone: 'success' },
    { product: 'Support de garde c...', sku: 'n°12343', category: 'Support', provider: 'Wurth', value: '$2.5', stock: '3,456', shipped: '732', status: 'Low stock', tone: 'warning' },
    { product: 'Serrage échelle po...', sku: 'n°12344', category: 'Support', provider: 'Unex', value: '$9', stock: '2,345', shipped: '1,987', status: 'In stock', tone: 'success' },
    { product: 'Ecrou à ressort M8', sku: 'n°12345', category: 'Screw/Nut', provider: 'Unex', value: '$9', stock: '5,678', shipped: '2,563', status: 'In stock', tone: 'success' },
    { product: 'Coulisseau Rainur...', sku: 'n°12346', category: 'Beam', provider: 'Unex', value: '$8', stock: '0', shipped: '312', status: 'Out of stock', tone: 'danger' },
    { product: 'Profilé Alu BOSCH...', sku: 'n°12347', category: 'Beam', provider: 'BOSH', value: '$49', stock: '2,111', shipped: '1,745', status: 'In stock', tone: 'success' },
    { product: 'SCHNEIDER ELECT...', sku: 'n°12348', category: 'Cable', provider: 'Schnider', value: '$4', stock: '4,321', shipped: '2,999', status: 'In stock', tone: 'success' },
    { product: 'Vis INOX FHC', sku: 'n°12349', category: 'Screw/Nut', provider: 'Unex', value: '$0.9', stock: '3,210', shipped: '845', status: 'Low stock', tone: 'warning' },
    { product: 'Ecrou à bille ST8 M...', sku: 'n°12340', category: 'Screw/Nut', provider: 'Unex', value: '$1.7', stock: '5,432', shipped: '1,234', status: 'In stock', tone: 'success' }
  ];

  readonly alertsToday: AlertItem[] = [
    { title: 'Item out of stock', description: 'Item #12346 is now out of stock', icon: 'error', tone: 'danger' },
    { title: 'Item misplaced', description: 'Item #12347 moved to Rack 13', icon: 'warning', tone: 'warning' }
  ];

  readonly alertsYesterday: AlertItem[] = [
    { title: 'No incidents', description: 'Everything remained stable yesterday', icon: 'check_circle', tone: 'success' }
  ];

  readonly recentOrders: OrderItem[] = [
    { id: 'order-1', orderNumber: 'n°12341', assignee: 'PH', items: 143, progress: 75, tracking: '00:21:40', orderDate: '15 Mar 2026', dueDate: '15 Mar 2025', status: 'In progress', tone: 'info' },
    { id: 'order-2', orderNumber: 'n°12342', assignee: 'PH', items: 143, progress: 100, tracking: '00:37:13', orderDate: 'Tomorrow', dueDate: 'Tomorrow', status: 'Completed', tone: 'success' },
    { id: 'order-3', orderNumber: 'n°12343', assignee: 'PH', items: 143, progress: 100, tracking: '00:37:13', orderDate: '10 Apr 2026', dueDate: '10 Apr 2026', status: 'Completed', tone: 'success' },
    { id: 'order-4', orderNumber: 'n°12344', assignee: 'PH', items: 143, progress: 50, tracking: '00:13:33', orderDate: '5 May 2026', dueDate: '5 May 2026', status: 'In progress', tone: 'info' },
    { id: 'order-5', orderNumber: 'n°12345', assignee: 'PH', items: 143, progress: 100, tracking: '00:37:13', orderDate: '30 Jan 2026', dueDate: '30 Jan 2026', status: 'Completed', tone: 'success' },
    { id: 'order-6', orderNumber: 'n°12346', assignee: 'PH', items: 143, progress: 20, tracking: '00:31:11', orderDate: '12 Jun 2026', dueDate: '12 Jun 2026', status: 'Canceled', tone: 'danger' },
    { id: 'order-7', orderNumber: 'n°12347', assignee: 'PH', items: 143, progress: 25, tracking: '00:03:58', orderDate: '18 Jul 2026', dueDate: '18 Jul 2026', status: 'Blocked', tone: 'warning' },
    { id: 'order-8', orderNumber: 'n°12348', assignee: 'PH', items: 143, progress: 100, tracking: '00:37:13', orderDate: '25 Aug 2026', dueDate: '25 Aug 2026', status: 'Completed', tone: 'success' },
    { id: 'order-9', orderNumber: 'n°12349', assignee: 'PH', items: 143, progress: 100, tracking: '00:37:13', orderDate: '1 Sep 2026', dueDate: '1 Sep 2026', status: 'Completed', tone: 'success' },
    { id: 'order-10', orderNumber: 'n°12350', assignee: 'PH', items: 143, progress: 80, tracking: '00:32:01', orderDate: 'Tomorrow', dueDate: 'Tomorrow', status: 'In progress', tone: 'info' }
  ];

  readonly inventorySummary = {
    itemsInInventory: '15.237',
    itemsInOrders: '12.499'
  };

  ngAfterViewInit(): void {
    this.initializeWeeklyChart();
  }

  ngOnDestroy(): void {
    this.weeklyChart?.destroy();
  }

  get filteredInventoryRows(): InventoryItem[] {
    const searchQuery = this.inventorySearch.trim().toLowerCase();
    const categoryQuery = this.inventoryCategoryFilter.trim().toLowerCase();

    if (!searchQuery && !categoryQuery) {
      return this.inventoryRows;
    }

    return this.inventoryRows.filter((row) => {
      const searchableValues = [row.product, row.sku, row.category, row.status].map((value) => value.toLowerCase());

      return (!searchQuery || searchableValues.some((value) => value.includes(searchQuery))) &&
        (!categoryQuery || row.category.toLowerCase().includes(categoryQuery));
    });
  }

  get filteredRecentOrders(): OrderItem[] {
    const searchQuery = this.orderSearch.trim().toLowerCase();
    const assigneeQuery = this.orderAssigneeFilter.trim().toLowerCase();
    const dateQuery = this.orderDateFilter.trim().toLowerCase();
    const dueDateQuery = this.orderDueDateFilter.trim().toLowerCase();
    const statusQuery = this.orderStatusFilter.trim().toLowerCase();

    if (!searchQuery && !assigneeQuery && !dateQuery && !dueDateQuery && !statusQuery) {
      return this.recentOrders;
    }

    return this.recentOrders.filter((order) => {
      const searchableValues = [order.orderNumber, order.assignee, order.orderDate, order.dueDate, order.status].map((value) => value.toLowerCase());

      return (!searchQuery || searchableValues.some((value) => value.includes(searchQuery))) &&
        (!assigneeQuery || order.assignee.toLowerCase().includes(assigneeQuery)) &&
        (!dateQuery || [order.orderDate, order.dueDate].some((value) => value.toLowerCase().includes(dateQuery))) &&
        (!dueDateQuery || order.dueDate.toLowerCase().includes(dueDateQuery)) &&
        (!statusQuery || order.status.toLowerCase().includes(statusQuery));
    });
  }

  progressBarClasses(tone: Tone): string {
    const classes: Record<Tone, string> = {
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
      neutral: 'bg-ink-subtle',
      info: 'bg-brand'
    };

    return classes[tone];
  }

  private initializeWeeklyChart(): void {
    if (typeof window === 'undefined' || !this.weeklyChartHost) {
      return;
    }

    const options: ApexOptions = {
      chart: {
        type: 'bar',
        height: 320,
        fontFamily: 'Rubik, sans-serif',
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: 'Items Received',
          data: [1200, 2300, 1400, 1700, 1500, 2250, 1200]
        },
        {
          name: 'Items Dispatched',
          data: [1550, 1500, 950, 2300, 800, 2000, 900]
        }
      ],
      legend: {
        position: 'bottom',
        fontSize: '12px',
        labels: {
          colors: '#6a7282'
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '42%'
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#227fee', '#a855f7'],
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: '#6a7282',
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6a7282',
            fontSize: '12px'
          }
        }
      },
      grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      tooltip: {
        theme: 'light'
      }
    };

    this.weeklyChart = new ApexCharts(this.weeklyChartHost.nativeElement, options);
    void this.weeklyChart.render();
  }
}
