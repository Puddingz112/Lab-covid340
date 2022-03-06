<template>
  <div class="about">
    <div>
      <span class="badge bg-primary text-wrap text-uppercase">Covid Form</span>
    </div>
    <div class="card container">
      <form @submit.prevent="addData">
        <div class="card-body">
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control"
              id="floatingInput"
              placeholder="date"
              v-model="date"
            />
            <label for="floatingInput">Date</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="name"
              class="form-control"
              id="floatingInput"
              placeholder="name"
              v-model="name"
            />
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="ATK"
            >
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
            <label for="floatingSelect">selects</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="tel"
              class="form-control"
              id="floatingInput"
              placeholder="phone number"
              v-model="phone"
            />
            <label for="floatingInput">Telephone</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              v-model="email"
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div class="container">
            <button type="submit" class="btn btn-primary">ADD DATA</button>
          </div>
        </div>
      </form>
      <div class="card-body">
        <table class="container table table-striped table-hover">
          <thead>
            <tr class="table-dark">
              <th scope="col">DATE</th>
              <th scope="col">NAME</th>
              <th scope="col">ATK</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in csDoc" :key="index" align="center">
              <td>{{ i.data.showdate }}</td>
              <td>{{ i.data.showname }}</td>
              <td>{{ i.data.showatkresult }}</td>
              <td>{{ i.data.showphone }}</td>
              <td>{{ i.data.showemail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import db from "../plugin/firebaseinit";

export default {
  data() {
    return {
      csDoc: [],
      name: "",
      email: "",
      ATK: "",
      phone: "",
      date: "",
    };
  },
  beforeMount() {
    this.readData();
  },
  methods: {
    async addData() {
      try {
        this.csDoc = [];
        const docRef = await addDoc(collection(db, "covidtable"), {
          showname: this.name,
          showemail: this.email,
          showatkresult: this.ATK,
          showphone: this.phone,
          showdate: this.date,
        });
        this.name = "";
        this.email = "";
        this.ATK = "";
        this.phone = "";
        this.date = "";
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    readData() {
      this.csDoc = [];
      const q = query(collection(db, "covidtable"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.csDoc.push({ id: doc.id, data: doc.data() });
        });
      });
    },
  },
};
</script>
