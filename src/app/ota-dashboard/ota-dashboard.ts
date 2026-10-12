import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { Footer } from '../footer/footer';

interface OtaSource {
  name: string;
  color: string;
  bookings: number;
  revenue: number;
}
 
interface MonthlyTrend {
  month: string;
  bookings: number;
}

@Component({
  imports: [HeaderComponent,Footer,CommonModule],
  selector: 'app-ota-dashboard',
  styleUrl: './ota-dashboard.css',
  templateUrl: './ota-dashboard.html',
})
export class OtaDashboard {
  sources = signal<OtaSource[]>([
    { name: 'Booking.com', color: '#003580', bookings: 482, revenue: 186500 },
    { name: 'Airbnb', color: '#FF5A5F', bookings: 315, revenue: 142200 },
    { name: 'Expedia', color: '#FFC72C', bookings: 210, revenue: 98750 },
    { name: 'Agoda', color: '#5C1F87', bookings: 156, revenue: 61300 }
  ]);
  monthlyTrend = signal<MonthlyTrend[]>([
    { month: 'Mar', bookings: 620 },
    { month: 'Apr', bookings: 705 },
    { month: 'May', bookings: 780 },
    { month: 'Jun', bookings: 690 },
    { month: 'Jul', bookings: 910 },
    { month: 'Aug', bookings: 1163 }
  ]);
   totalBookings = computed(() =>
    this.sources().reduce((sum, s) => sum + s.bookings, 0)
  );
 
  totalRevenue = computed(() =>
    this.sources().reduce((sum, s) => sum + s.revenue, 0)
  );
 
  avgBookingValue = computed(() =>
    Math.round(this.totalRevenue() / this.totalBookings())
  );
 
  topSource = computed(() =>
    [...this.sources()].sort((a, b) => b.bookings - a.bookings)[0]
  );
 
  maxSourceBookings = computed(() =>
    Math.max(...this.sources().map(s => s.bookings))
  );
 
  // Bar chart heights (%) relative to the largest source
  barHeight(bookings: number): number {
    return Math.round((bookings / this.maxSourceBookings()) * 100);
  }
  private chartWidth = 560;
  private chartHeight = 180;
  private padding = 24;
 
  linePoints = computed(() => {
    const data = this.monthlyTrend();
    const max = Math.max(...data.map(d => d.bookings));
    const min = Math.min(...data.map(d => d.bookings));
    const range = max - min || 1;
    const stepX = (this.chartWidth - this.padding * 2) / (data.length - 1);
 
    return data.map((d, i) => {
      const x = this.padding + i * stepX;
      const y =
        this.chartHeight -
        this.padding -
        ((d.bookings - min) / range) * (this.chartHeight - this.padding * 2);
      return { x, y, month: d.month, bookings: d.bookings };
    });
  });
 
  linePath = computed(() =>
    this.linePoints()
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ')
  );
 
  areaPath = computed(() => {
    const pts = this.linePoints();
    if (!pts.length) return '';
    const first = pts[0];
    const last = pts[pts.length - 1];
    return `${this.linePath()} L ${last.x} ${this.chartHeight - this.padding} L ${first.x} ${this.chartHeight - this.padding} Z`;
  });
 
  svgViewBox = `0 0 ${this.chartWidth} ${this.chartHeight}`;

}
