import { Button } from "@/components/uikit";

export default function Uikit() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Button size={"sm"}>Hello</Button>
        <Button size={"md"}>Hello</Button>
        <Button size={"lg"}>Hello</Button>
        <Button size={"xl"}>Hello</Button>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Button variant={"outline"} size={"sm"}>
          Hello
        </Button>
        <Button variant={"outline"} size={"md"}>
          Hello
        </Button>
        <Button variant={"outline"} size={"lg"}>
          Hello
        </Button>
        <Button variant={"outline"} size={"xl"}>
          Hello
        </Button>
      </div>
    </div>
  );
}
