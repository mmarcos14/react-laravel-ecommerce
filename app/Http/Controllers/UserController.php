<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $userService;
    public function __construct(UserService $userservice){
        $this->userService=$userservice;
    }
    
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $validate = Validator::make($request->all(), [
                    'lastname' => ['required'],
                     'firstname' => ['required'],
                    'email' => ['required', 'email', 'unique:users,email'],
                    'password' => ['required', 'confirmed'],
          ]);

          if($validate->fails()){
            return response()->json(['errors'=>$validate->errors()],422);
          }

          $data=$validate->validate();
          $user=$this->userService->register($data,$request);

          if(!$user){
            return response()->json(['errors'=>'failed saved'],504);
          }

          $this->userService->login($user);

            return response()->json(['status'=>200,'message'=>'saved successfully','userc'=>$user]);

    }


  public function getLastCode()
{
    $user = User::orderBy('id', 'DESC')->first();

    if ($user && !empty($user->ucode)) {

        $code = str_replace("U", "", $user->ucode);

        $increase = $code + 1;

        $string = str_pad($increase, 5, "0", STR_PAD_LEFT);

        return "U" . $string;

    } else {

        return "U00001";
    }
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function login(Request $request){
     if(!$request->email || !$request->password){
        return response()->json(['message'=>'email and password required'],422);
     }

     $success =Auth::attempt([
        'email'=>$request->email,
        'password'=>$request->password
     ]);

     if(!$success){
        return response()->json(['message'=>'credentials invalid'],403);

     }
      $request->session()->regenerate();

        return response()->json(['message'=>'everything good'],200);

    }

    public function getUser(){
        $user=Auth::user()->load('adresse');
        return response()->json(['datauser'=>$user]);
    }


    public function removeuserconnexion(Request $request){
        return $this->userService->logout($request);
    }
}
