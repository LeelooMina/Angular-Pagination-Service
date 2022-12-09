import { Component, OnInit } from '@angular/core';
import { CocktailSearchService } from '../shared/cocktail/cocktail.service';
import { Cocktail } from '../shared/cocktail/cocktail.model';
import { CocktailDetail } from '../shared/cocktail/cocktail-detail.model';
import { PaginationService} from '../shared/pagination.service';

@Component({
  selector: 'app-cocktail-search',
  templateUrl: './cocktail-search.component.html',
  styleUrls: ['./cocktail-search.component.css']
})
export class CocktailSearchComponent implements OnInit {

  constructor(private cocktailSearchService: CocktailSearchService, private pageService: PaginationService) { }

  ngOnInit(): void {
  }


  cocktailList = [];
  cocktailListShow = [];

  showPages: number[] = [];
  currentPage = 1;
  pageAmt: number;
  itemsPerPage = 12;



  ingredientInput = '';
  singleCocktail: CocktailDetail = {
    idDrink: "",
  };

  displayStyle = "none";






  onClick(){

    this.cocktailSearchService.searchCocktails(this.ingredientInput).subscribe((res) => {

      this.cocktailList = res;

      this.currentPage = 1;

      this.cocktailListShow = this.pageService.paginateArray(this.currentPage, this.itemsPerPage, this.cocktailList);

      this.pageAmt = this.pageService.pageCount(this.itemsPerPage, this.cocktailList)

      this.showPages = this.pageService.limitPageButtons(this.pageAmt, this.currentPage)


    })

  }

  pageChange(page: number){

    if(page <= this.pageAmt){

    this.currentPage = page;
    this.showPages = this.pageService.limitPageButtons(this.pageAmt, this.currentPage)
    this.cocktailListShow = this.pageService.paginateArray(this.currentPage, this.itemsPerPage, this.cocktailList);
    }

    window.scroll(0,0);

  }

  nextPage(next: boolean){

    this.currentPage = next ? this.currentPage+1 : this.currentPage-1;


    this.showPages = this.pageService.limitPageButtons(this.pageAmt, this.currentPage)

    this.cocktailListShow = this.pageService.paginateArray(this.currentPage, this.itemsPerPage, this.cocktailList);

    window.scroll(0,0);
  }

  cocktailDetails(id){
    this.cocktailSearchService.getCocktail(id).subscribe((res) => {
     this.singleCocktail = res;
     console.log(this.singleCocktail)
    })
    this.displayStyle = "block";
  }

  closePopup(){
    this.displayStyle = "none";
  }



}
