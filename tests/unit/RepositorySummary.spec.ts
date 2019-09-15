import { shallowMount } from "@vue/test-utils";
import RepositorySummary from "@/components/RepositorySummary.vue";

const translate = jest.fn(s => s);

describe("RepositorySummary.vue", () => {
  it("Should render the table", () => {
    const wrapper = shallowMount(RepositorySummary, {
      propsData: {
        repository: { name: "repo-name", owner: { login: "repo-owner" } }
      },
      filters: {
        translate
      }
    });

    expect(wrapper.findAll("tr")).toHaveLength(2);
    expect(wrapper.findAll("th")).toHaveLength(2);

    const valueCells = wrapper.findAll("td");
    expect(valueCells).toHaveLength(2);
    expect(valueCells.at(0).text()).toBe("repo-name");
    expect(valueCells.at(1).text()).toBe("repo-owner");
  });
});
