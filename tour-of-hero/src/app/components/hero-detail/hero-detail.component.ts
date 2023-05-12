import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor( private heroService: HeroService, private location: Location, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.getHero()
  }

  getHero(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }

  goBack(){
    this.location.back();
  }
}
