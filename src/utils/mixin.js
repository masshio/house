export const DetailMixin = {
    data() {
        return {
            house: {
                hprice: "",
                htype: "",
                hsquare: "",
                hdes: "",
                hadd: "",
                hpic: "",
            },
            user: {
                rname: "",
                uphone: "",
                uemail: "",
                uavatar: "avatar.png",
            },
            style: { fontSize: 16 + "px" },
            flag: true,
            hdate: {}
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        imgUrl() {
            return this.house.hpic === ""
                ? ""
                : "http://localhost:3000/" + this.house.hpic;
        },
        storey() {
            if (this.house.floor < this.house.tfloor / 3) {
                return "低层";
            } else if (this.house.floor < 2 * this.house.tfloor / 3) {
                return "中层";
            } else {
                return "高层";
            }
        },
    },
    
}