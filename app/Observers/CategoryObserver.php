<?php

namespace App\Observers;

use App\Models\Category;

class CategoryObserver
{
    /**
     * Handle the Category "created" event.
     */
    public function creating(Category $category): void
    {
        $lastcategory=Category::latest()->first();
        if($lastcategory && !empty($lastcategory->code)){
            $code=str_replace("C","",$lastcategory->code);
            $increase=(int) $code+1;
            $string=str_pad($increase,5,"0",STR_PAD_LEFT);
            $category->code= "C". $string;
        }else{
            $category->code="C00001";
        }
    }

    /**
     * Handle the Category "updated" event.
     */
    public function updated(Category $category): void
    {
        //
    }

    /**
     * Handle the Category "deleted" event.
     */
    public function deleted(Category $category): void
    {
        //
    }

    /**
     * Handle the Category "restored" event.
     */
    public function restored(Category $category): void
    {
        //
    }

    /**
     * Handle the Category "force deleted" event.
     */
    public function forceDeleted(Category $category): void
    {
        //
    }
}
