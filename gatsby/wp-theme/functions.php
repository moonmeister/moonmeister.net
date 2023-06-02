<?php
  add_theme_support( 'post-thumbnails' );
  add_theme_support( 'menus' );

  function register_my_menus() {
    register_nav_menus(
      array(
      'main-menu' => __( 'Main Menu' ),
      'social-menu' => __( 'Social Menu' ),
      )
    );
  }

  add_action( 'init', 'register_my_menus' );
?>
