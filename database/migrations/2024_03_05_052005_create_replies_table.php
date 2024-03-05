<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('replies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('text');
            $table->integer('visibility')->nullable();
            $table->timestamps();

            // Replies can be on a submission
            $table->integer('submission_id')->unsigned()->nullable();
            $table->foreign('submission_id')->references('id')->on('submissions');

            // Replies can be on another reply
            $table->integer('reply_id')->unsigned()->nullable();
            $table->foreign('reply_id')->references('id')->on('replies');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('replies');
    }
};
