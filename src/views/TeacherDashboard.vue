<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      show-if-above
      :width="300"
      :breakpoint="100"
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-1'"
    >
      <div>
        <q-list>
          <q-expansion-item default-opened icon="format_list_bulleted" label="题库管理">
            <q-list>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 1"
                replace
              >
                <q-item-section>选择题</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 2"
                replace
              >
                <q-item-section>判断题</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                :to="'/dashboard/items-list/' + 3"
                replace
              >
                <q-item-section>简答题</q-item-section>
              </q-item>
              <q-item
                clickable
                :active-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
                to="/dashboard/add-items/"
                replace
              >
                <q-item-section>添加试题</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-expansion-item default-opened icon="group" label="班级管理"></q-expansion-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
