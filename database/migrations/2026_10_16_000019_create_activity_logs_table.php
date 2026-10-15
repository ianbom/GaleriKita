<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('event_id')->nullable();
            $table->enum('actor_type', ['user', 'guest', 'system']);
            $table->bigInteger('actor_user_id')->nullable();
            $table->bigInteger('actor_guest_id')->nullable();
            $table->string('action', 100);
            $table->string('subject_type', 100);
            $table->bigInteger('subject_id');
            $table->jsonb('changes')->nullable();
            $table->timestampTz('created_at');
            $table->index(['event_id', 'created_at'], 'activity_logs_event_id_created_at_index');
            $table->index(['actor_type', 'created_at'], 'activity_logs_actor_type_created_at_index');
            $table->index(['subject_type', 'subject_id'], 'activity_logs_subject_type_subject_id_index');
            $table->foreign('event_id', 'activity_logs_event_id_foreign')->references('id')->on('events');
            $table->foreign('actor_user_id', 'activity_logs_actor_user_id_foreign')->references('id')->on('users');
            $table->foreign('actor_guest_id', 'activity_logs_actor_guest_id_foreign')->references('id')->on('event_guests');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
    }
};
